import fs from "node:fs"
import path from "node:path"
import type { Metadata } from "next"
import { Marked } from "marked"
import { JSDOM } from "jsdom"
import linksData from "@/data/links.json"
import { siteConfig } from "@/config/site"

export interface Article {
  slug: string
  title: string
  description: string
  html: string
}

export function loadArticle(slug: string): Article | null {
  if (!/^[a-zA-Z0-9][a-zA-Z0-9_-]*$/.test(slug)) return null
  let content: string
  try {
    content = fs.readFileSync(path.join(process.cwd(), "pages", `${slug}.md`), "utf8")
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null
    throw error
  }
  const markdown = new Marked({ gfm: true, async: false })
  const dom = new JSDOM(markdown.parse(content) as string)
  const document = dom.window.document
  const ids = new Set<string>()
  document.querySelectorAll("h1,h2,h3,h4,h5,h6").forEach(heading => {
    const base = (heading.textContent || "").toLowerCase().replace(/[^\w一-龥]+/g, "-").replace(/^-+|-+$/g, "") || "section"
    let id = base
    let count = 2
    while (ids.has(id)) id = `${base}-${count++}`
    ids.add(id)
    heading.id = id
  })
  document.querySelectorAll("img").forEach(img => {
    if (!img.alt) img.alt = img.getAttribute("src")?.split("/").pop() || "文章配图"
    img.loading = "lazy"
  })
  const resource = linksData.data.flatMap(category => category.links).find(link => "page" in link && link.page === `${slug}.md`)
  const text = [...document.querySelectorAll("p")].map(paragraph => (paragraph.textContent || "").replace(/\s+/g, " ").trim()).find(Boolean)
  const result = {
    slug,
    title: document.querySelector("h1")?.textContent?.trim() || resource?.title || slug,
    description: (text || resource?.description || siteConfig.description).slice(0, 180),
    html: document.body.innerHTML,
  }
  dom.window.close()
  return result
}

export function articleMetadata(article: Article): Metadata {
  const canonical = `/page/${article.slug}`
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      locale: siteConfig.locale,
      siteName: siteConfig.siteName,
      url: new URL(canonical, siteConfig.baseUrl).href,
      title: article.title,
      description: article.description,
    },
    twitter: { card: "summary", title: article.title, description: article.description },
  }
}

export function addReferral(value: string): string {
  if (value.startsWith("/")) return value
  const url = new URL(value)
  if (url.origin === siteConfig.baseUrl || url.searchParams.has("ref")) return value
  url.searchParams.set("ref", siteConfig.baseUrl)
  return url.href
}
