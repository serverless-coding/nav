import type { CategoryWithLinks } from "@/app/links"

export interface NavSearch {
  q: string
  subject: string
}

export function searchHref({ q, subject }: NavSearch): string {
  const params = new URLSearchParams()
  if (q.trim()) params.set("q", q.trim())
  if (subject.trim()) params.set("subject", subject.trim())
  return params.size ? `/?${params.toString()}` : "/"
}

export function filterNavResources(categories: CategoryWithLinks[], { q, subject }: NavSearch): CategoryWithLinks[] {
  const query = q.trim().toLowerCase()
  const sub = subject.trim().toLowerCase()
  return categories.map(category => ({
    ...category,
    links: category.links.filter(link => {
      const textMatches = !query || [link.title, link.description, link.url].some(value => value.toLowerCase().includes(query))
      const subjects = Array.isArray(link.subject) ? link.subject : [link.subject || ""]
      return textMatches && (!sub || subjects.some(value => value.trim().toLowerCase() === sub))
    }),
  })).filter(category => category.links.length > 0)
}
