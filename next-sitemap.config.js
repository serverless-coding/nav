/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://nav.programnotes.cn',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://nav.programnotes.cn/server-sitemap.xml', // <= sitemap route here
    ],
  },
}
