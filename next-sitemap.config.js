/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://nav.programnotes.cn',
  generateRobotsTxt: true,
  exclude: ['/server-sitemap.xml'], // <= exclude here
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://nav.programnotes.cn/server-sitemap.xml', // <= sitemap route here
    ],
  },
}
