import type { MetadataRoute } from "next"

import { siteConfig } from "@/config/site"
import { getAllPageSlugs, getPageMeta } from "@/lib/pages"
import { getCategorySlug } from "@/app/links"
import linksData from "@/data/links.json"
import fs from "fs"
import path from "path"

// 唯一的站点地图来源（已移除 next-sitemap 和 server-sitemap.xml）
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.baseUrl
  const pages = getAllPageSlugs().map((slug) => getPageMeta(slug))

  // 首页的 lastModified 取链接数据文件和最新文章中较新的时间
  const dataMtime = fs.statSync(path.join(process.cwd(), "data", "links.json")).mtime
  const latest = pages.reduce((d, p) => (p.updated > d ? p.updated : d), dataMtime)

  const home: MetadataRoute.Sitemap[number] = {
    url: base,
    lastModified: latest,
    changeFrequency: "daily",
    priority: 1,
  }

  const aiChat: MetadataRoute.Sitemap[number] = {
    url: `${base}/ai`,
    changeFrequency: "monthly",
    priority: 0.5,
  }

  // 被首页卡片引用的详情页优先级更高
  const linked = new Set(
    linksData.data.flatMap((c) => c.links).map((l: any) => l.page?.replace(/\.md$/, "")).filter(Boolean)
  )
  const navPages = new Set(
    siteConfig.mainNav.map((n) => n.href).filter((h) => h.startsWith("/page/")).map((h) => h.replace("/page/", ""))
  )

  const detail = pages.map((p) => ({
    url: `${base}/page/${p.slug}`,
    lastModified: p.updated,
    changeFrequency: "weekly" as const,
    priority: navPages.has(p.slug) ? 0.8 : linked.has(p.slug) ? 0.7 : 0.6,
  }))

  // 分类静态页
  const categories = linksData.data.map((c, i) => ({
    url: `${base}/category/${getCategorySlug(c.title, i)}`,
    lastModified: dataMtime,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }))

  return [home, ...categories, ...detail, aiChat]
}
