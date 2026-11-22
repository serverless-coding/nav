import fs from "fs"
import path from "path"
import matter from "gray-matter"

export const PAGES_DIR = path.join(process.cwd(), "pages")

export interface PageMeta {
  slug: string
  title: string
  description: string
  keywords: string[]
  image?: string
  updated: Date
  content: string // 去掉 frontmatter 后的 markdown 正文
}

// 去掉 markdown 语法，得到纯文本
function stripMarkdown(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/[#>*_`~|-]/g, "")
    .replace(/\s+/g, " ")
    .trim()
}

function truncate(text: string, max = 150): string {
  return text.length > max ? text.slice(0, max - 1) + "…" : text
}

export function pageExists(slug: string): boolean {
  if (!/^[\w.-]+$/.test(slug)) return false
  return fs.existsSync(path.join(PAGES_DIR, `${slug}.md`))
}

export function getAllPageSlugs(): string[] {
  return fs
    .readdirSync(PAGES_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""))
}

/**
 * 读取 pages/{slug}.md 的元信息。
 * 支持可选 frontmatter：
 * ---
 * title: 标题
 * description: 摘要
 * keywords: [a, b]
 * image: /images/xx.png
 * updated: 2026-11-22
 * ---
 * 未提供时自动从一级标题、首段正文、二级标题推断。
 */
export function getPageMeta(slug: string): PageMeta {
  const filePath = path.join(PAGES_DIR, `${slug}.md`)
  const raw = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(raw)

  const h1 = content.match(/^#\s+(.+?)\s*$/m)?.[1]
  const title = String(data.title || (h1 ? stripMarkdown(h1) : "") || slug)

  let description = data.description ? String(data.description) : ""
  if (!description) {
    // 取第一段非标题、非图片的正文
    const paragraphs = content
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter((p) => p && !p.startsWith("#") && !/^!\[/.test(p) && !/^\[!\[/.test(p))
    description = truncate(stripMarkdown(paragraphs[0] || title))
  }

  const keywords: string[] = Array.isArray(data.keywords)
    ? data.keywords.map(String)
    : [...content.matchAll(/^##\s+(.+?)\s*$/gm)].slice(0, 5).map((m) => stripMarkdown(m[1])).filter(Boolean)

  const image =
    (data.image as string | undefined) ||
    content.match(/!\[[^\]]*\]\((\S+?)(?:\s+"[^"]*")?\)/)?.[1]

  let updated: Date
  if (data.updated) {
    updated = new Date(data.updated)
  } else {
    updated = fs.statSync(filePath).mtime
  }

  return { slug, title, description, keywords, image, updated, content }
}
