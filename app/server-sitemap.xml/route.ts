import { getServerSideSitemap } from 'next-sitemap'
import linksData from '../../data/links.json'

export async function GET() {
  const staticPosts = ['', 'page/about', 'page/aigames', "page/mirror"];

  const dynamicPosts = linksData.data.reduce((acc: string[], category) => {
    category.links.forEach(link => {
      if (link.page) {
        acc.push(`page/${link.page.replace('.md', '')}`);
      }
    });
    return acc;
  }, []);

  const posts = [...staticPosts, ...dynamicPosts];

  const fields = posts.map((slug: string) => ({
    loc: `https://nav.programnotes.cn/${slug}`,
    lastmod: new Date().toISOString(),
  }));

  return getServerSideSitemap(fields);
}
