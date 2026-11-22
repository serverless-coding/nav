import { siteConfig } from "@/config/site"
import getNavLinks from "@/app/links"
import { getAllPageSlugs, getPageMeta } from "@/lib/pages"

const oneLine = (s: string) => (s || "").replace(/\s+/g, " ").trim()

/**
 * 生成 llms.txt（https://llmstxt.org 规范）
 * full=false：站点简介 + 分类工具清单 + 文章索引
 * full=true ：额外附上全部文章正文，供大模型一次性读取
 */
export async function buildLlmsTxt(full = false): Promise<string> {
  const base = siteConfig.baseUrl
  const cats = await getNavLinks()
  const pages = getAllPageSlugs().map((s) => getPageMeta(s))
  const total = cats.reduce((n, c) => n + c.links.length, 0)

  const out: string[] = []
  out.push(`# ${siteConfig.name}`)
  out.push("")
  out.push(`> ${siteConfig.description} 当前收录 ${total} 个工具，分为 ${cats.length} 个分类。`)
  out.push("")
  out.push(`- 网站：${base}`)
  out.push(`- 语言：简体中文`)
  out.push(`- 站点地图：${base}/sitemap.xml`)
  out.push(`- 提交站点：${base}/page/about`)
  out.push("")

  out.push("## 文章与工具介绍")
  out.push("")
  for (const p of pages) {
    out.push(`- [${oneLine(p.title)}](${base}/page/${p.slug}): ${oneLine(p.description)}`)
  }
  out.push("")

  for (const c of cats) {
    out.push(`## ${c.title}`)
    out.push("")
    out.push(`分类页：${base}/category/${c.id}`)
    out.push("")
    for (const l of c.links) {
      const detail = l.page ? `（详细介绍：${base}/page/${l.page.replace(/\.md$/, "")}）` : ""
      out.push(`- [${oneLine(l.title)}](${l.url}): ${oneLine(l.description)}${detail}`)
    }
    out.push("")
  }

  if (full) {
    out.push("---")
    out.push("")
    out.push("# 全部文章正文")
    out.push("")
    for (const p of pages) {
      out.push(`<!-- source: ${base}/page/${p.slug} | updated: ${p.updated.toISOString().slice(0, 10)} -->`)
      out.push(p.content.trim())
      out.push("")
      out.push("---")
      out.push("")
    }
  }

  return out.join("\n")
}
