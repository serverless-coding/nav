import { getServerSideSitemap } from 'next-sitemap'

export async function GET() {
  const posts = ['', 'page/about', 'page/aigames', "/page/mirror"]

  const fields = posts.map((slug) => ({
    loc: `https://nav.programnotes.cn/${slug}`,
    lastmod: new Date().toISOString(),
  }))

  return getServerSideSitemap(fields)
}
