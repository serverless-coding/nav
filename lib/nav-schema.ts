import { z } from "zod"

const id = z.string().regex(/^[a-zA-Z0-9_-]+$/)
const safeUrl = z.string().refine(value => {
  if (/^\/(?!\/)/.test(value)) return !value.includes("\\")
  try {
    const url = new URL(value)
    return ["http:", "https:"].includes(url.protocol) && !url.username && !url.password
  } catch {
    return false
  }
}, "URL must be HTTP(S) or a local path")

const resourceSchema = z.object({
  id,
  title: z.string().trim().min(1),
  url: safeUrl,
  icon: safeUrl.or(z.literal("")).optional(),
  description: z.string(),
  page: z.string().regex(/^[a-zA-Z0-9][a-zA-Z0-9_-]*\.md$/).optional(),
  subject: z.union([z.string().trim().min(1), z.array(z.string().trim().min(1))]).optional(),
})

export const navDataSchema = z.object({
  data: z.array(z.object({
    id,
    title: z.string().trim().min(1),
    icon: safeUrl.or(z.literal("")),
    links: z.array(resourceSchema),
  })),
}).superRefine(({ data }, context) => {
  const ids = new Set<string>()
  data.forEach((category, categoryIndex) => {
    const checkId = (value: string, path: (string | number)[]) => {
      if (ids.has(value)) context.addIssue({ code: z.ZodIssueCode.custom, path, message: "Duplicate ID" })
      ids.add(value)
    }
    checkId(category.id, ["data", categoryIndex, "id"])
    const urls = new Set<string>()
    category.links.forEach((link, linkIndex) => {
      checkId(link.id, ["data", categoryIndex, "links", linkIndex, "id"])
      if (urls.has(link.url)) context.addIssue({ code: z.ZodIssueCode.custom, path: ["data", categoryIndex, "links", linkIndex, "url"], message: "Duplicate URL within category" })
      urls.add(link.url)
    })
  })
})
