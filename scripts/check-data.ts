import fs from "node:fs"
import path from "node:path"
import linksData from "../data/links.json"
import { navDataSchema } from "../lib/nav-schema"
import { siteConfig } from "../config/site"

const data = navDataSchema.parse(linksData)
const missing: string[] = []
function checkFile(directory: string, file: string) {
  const root = path.resolve(directory)
  const resolved = path.resolve(root, file.split(/[?#]/)[0])
  if (!resolved.startsWith(root + path.sep) || !fs.existsSync(resolved)) missing.push(`${directory}/${file}`)
}
function checkLocalUrl(url: string) {
  if (!url.startsWith("/")) return
  if (url.startsWith("/page/")) checkFile("pages", `${url.slice(6).split(/[?#]/)[0]}.md`)
}
for (const category of data.data) {
  if (category.icon.startsWith("/")) checkFile("public", category.icon.slice(1))
  for (const link of category.links) {
    if (link.page) checkFile("pages", link.page)
    checkLocalUrl(link.url)
    if (link.icon?.startsWith("/")) checkFile("public", link.icon.slice(1))
    if (!link.description.trim()) console.warn(`Missing description: ${category.title} / ${link.title}`)
  }
}
for (const item of siteConfig.mainNav) checkLocalUrl(item.href)
if (missing.length) throw new Error(`Missing files:\n${missing.join("\n")}`)
console.log(`Validated ${data.data.length} categories and ${data.data.reduce((sum, category) => sum + category.links.length, 0)} resources`)
