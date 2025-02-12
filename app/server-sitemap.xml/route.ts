import { getServerSideSitemap } from 'next-sitemap'

export async function GET() {
  const posts = ['post-1', 'post-2', 'post-3']

  const fields = posts.map((slug) => ({
    loc: `http://localhost:3000/page/${slug}`,
    lastmod: new Date().toISOString(),
  }))

  return getServerSideSitemap(fields)
}
