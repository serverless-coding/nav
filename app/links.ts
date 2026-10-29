import { siteConfig } from "@/config/site"
import type { Link as SiteLink } from "@/types/nav"
import linksData from "@/data/links.json"
import { navDataSchema } from "@/lib/nav-schema"

function getSiteIcon(url: string): string {
  if (url.startsWith("/")) return siteConfig.icon.default
  const site = new URL(url).origin
  return `${siteConfig.baseUrl}/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&size=48&url=${encodeURIComponent(site)}`
}

export default async function getNavLinks(): Promise<CategoryWithLinks[]> {
  return navDataSchema.parse(linksData).data.map(category => ({
    id: category.id,
    title: category.title,
    icon: category.icon || getSiteIcon(category.links[0]?.url || "/"),
    description: "",
    rank: 0,
    links: category.links.map(link => ({
      ...link,
      icon: link.icon || getSiteIcon(link.url),
      rank: 0,
      public: true,
      cid: category.id,
    })),
  }))
}

export interface CategoryWithLinks {
  id: string
  icon: string
  title: string
  description: string
  rank: number
  links: SiteLink[]
  page?: string
}
