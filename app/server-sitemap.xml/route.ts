import { getServerSideSitemap } from 'next-sitemap'
import linksData from '../../data/links.json'
import { siteConfig } from '../../config/site'

export async function GET() {
  const staticPosts = ['', 'page/about', 'page/aigames', "/page/mirror", "/page/devtool"];

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
    loc: `${siteConfig.baseUrl}/${slug}`,
    lastmod: new Date().toISOString(),
  }));

  return getServerSideSitemap(fields);
}
