const fs = require("node:fs")
const path = require("node:path")
const links = require("../data/links.json")

function getPublicPaths(mainNav) {
  const pages = new Set(["/", "/page/about", "/page/aigames", "/page/mirror", "/page/devtool"])
  for (const item of mainNav) {
    if (item.href.startsWith("/page/")) pages.add(item.href)
  }
  for (const category of links.data) {
    for (const link of category.links) {
      if (link.page) pages.add(`/page/${link.page.replace(/\.md$/, "")}`)
      if (link.url.startsWith("/page/")) pages.add(link.url.split(/[?#]/)[0])
    }
  }
  for (const page of pages) {
    if (page === "/") continue
    const match = page.match(/^\/page\/([a-zA-Z0-9][a-zA-Z0-9_-]*)$/)
    if (!match || !fs.existsSync(path.join(process.cwd(), "pages", `${match[1]}.md`))) {
      throw new Error(`Invalid public article: ${page}`)
    }
  }
  return [...pages].sort()
}

module.exports = { getPublicPaths }
