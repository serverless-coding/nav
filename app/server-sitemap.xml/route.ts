import { getServerSideSitemap } from "next-sitemap"
import { getPublicPaths } from "@/lib/public-pages.cjs"
import { siteConfig } from "@/config/site"

export async function GET() {
  const paths: string[] = getPublicPaths(siteConfig.mainNav)
  return getServerSideSitemap(paths.map(path => ({ loc: path === "/" ? siteConfig.baseUrl : new URL(path, siteConfig.baseUrl).href })))
}
