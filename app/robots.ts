import type { MetadataRoute } from "next"

import { siteConfig } from "@/config/site"

// 明确允许的 AI 搜索 / 大模型爬虫（GEO：让 AI 能抓取并引用本站内容）
const AI_BOTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bytespider",
  "Baiduspider",
  "YisouSpider",
  "Sogou web spider",
  "Amazonbot",
  "cohere-ai",
  "meta-externalagent",
]

const DISALLOW = ["/api/", "/*?q=", "/faviconV2", "/translate"]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: DISALLOW },
      { userAgent: AI_BOTS, allow: ["/", "/llms.txt", "/llms-full.txt"], disallow: DISALLOW },
    ],
    sitemap: `${siteConfig.baseUrl}/sitemap.xml`,
    host: siteConfig.baseUrl,
  }
}
