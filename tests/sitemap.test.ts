import assert from "node:assert/strict"
import test from "node:test"
import { GET } from "../app/server-sitemap.xml/route"
import config from "../next-sitemap.config"

test("sitemap endpoints share normalized public URLs without invented dates", async () => {
  const response = await GET()
  const xml = await response.text()
  assert.ok(!xml.includes("https://nav.programnotes.cn//"))
  assert.ok(!xml.includes("<lastmod>"))
  const dynamicUrls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1])
  assert.equal(new Set(dynamicUrls).size, dynamicUrls.length)
  assert.ok(dynamicUrls.includes("https://nav.programnotes.cn/page/free"))
  const transform = config.transform
  assert.ok(transform)
  assert.ok(config.additionalPaths)
  const fields = await config.additionalPaths({ ...config, transform })
  const staticUrls = fields.flatMap(field => field ? [field.loc === "/" ? "https://nav.programnotes.cn" : `https://nav.programnotes.cn${field.loc}`] : [])
  assert.deepEqual([...dynamicUrls].sort(), staticUrls.sort())
  assert.equal(await transform(config, "/ai"), null)
  assert.equal(await transform(config, "/server-sitemap.xml"), null)
})
