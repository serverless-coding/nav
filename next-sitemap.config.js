const fs = require('fs')
const path = require('path')

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://nav.programnotes.cn',
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  additionalPaths: async () => {
    const linksPath = path.join(process.cwd(), 'data/links.json')
    const links = JSON.parse(fs.readFileSync(linksPath, 'utf8'))
    const pages = links.data
      .flatMap((category) => category.links)
      .filter((link) => link.page)
      .map((link) => ({
        loc: `/page/${link.page.replace('.md', '')}`,
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
        priority: 0.6,
      }))
    return pages
  },
}
