const { getPublicPaths } = require("./lib/public-pages.cjs")
const navigation = require("./config/navigation.json")
const { baseUrl } = require("./config/url.json")

const paths = getPublicPaths(navigation)
const allowed = new Set(paths)

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: baseUrl,
  sourceDir: process.env.NEXT_DIST_DIR || ".next",
  generateRobotsTxt: true,
  autoLastmod: false,
  sitemapSize: 5000,
  exclude: ["/ai", "/api/*", "/server-sitemap.xml"],
  transform: async (_config, url) => allowed.has(url) ? { loc: url } : null,
  additionalPaths: async () => paths.map(loc => ({ loc })),
  robotsTxtOptions: {
    additionalSitemaps: [`${baseUrl}/server-sitemap.xml`],
  },
}
