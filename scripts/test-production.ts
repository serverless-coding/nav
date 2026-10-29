import assert from "node:assert/strict"
import { spawn } from "node:child_process"
import { once } from "node:events"
import { setTimeout as delay } from "node:timers/promises"
import { JSDOM } from "jsdom"

async function main() {
  const port = process.env.SMOKE_PORT || "3197"
  const base = `http://127.0.0.1:${port}`
  const server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "-H", "127.0.0.1", "-p", port], { stdio: ["ignore", "pipe", "pipe"] })
  let output = ""
  server.stdout.on("data", data => { output += data })
  server.stderr.on("data", data => { output += data })
  const exited = once(server, "exit")
  try {
    let ready = false
    for (let i = 0; i < 100; i++) {
      if (server.exitCode !== null) throw new Error(output)
      if (output.includes("Ready in")) { ready = true; break }
      await delay(100)
    }
    assert.ok(ready, `Production server did not become ready: ${output}`)
    for (const path of ["/", "/?q=Cursor"]) {
      const response = await fetch(base + path)
      assert.equal(response.status, 200)
      const document = new JSDOM(await response.text()).window.document
      assert.ok(document.querySelector('a[aria-label="Cursor"]'))
      assert.equal(document.querySelectorAll("h1").length, 1)
      assert.equal(document.querySelectorAll("h2").length, 17)
    }
    const article = await fetch(base + "/page/trae")
    const articleHtml = await article.text()
    assert.equal(article.status, 200, output + articleHtml.slice(0, 1800))
    const document = new JSDOM(articleHtml).window.document
    assert.equal(document.querySelector('link[rel="canonical"]')?.getAttribute("href"), "https://nav.programnotes.cn/page/trae")
    assert.equal(document.querySelector('meta[property="og:url"]')?.getAttribute("content"), "https://nav.programnotes.cn/page/trae")
    assert.equal((await fetch(base + "/page/missing-production-smoke")).status, 404)
    const paused = new JSDOM(await (await fetch(base + "/ai")).text()).window.document
    assert.ok(paused.querySelector('meta[name="robots"]')?.getAttribute("content")?.includes("noindex"))
    for (const body of ["invalid", JSON.stringify({ messages: [] })]) assert.equal((await fetch(base + "/api/chat", { method: "POST", body })).status, 503)
    const xml = await (await fetch(base + "/sitemap-0.xml")).text()
    const legacy = await (await fetch(base + "/server-sitemap.xml")).text()
    const locations = (text: string) => [...text.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]).sort()
    assert.deepEqual(locations(xml), locations(legacy))
    assert.ok(locations(xml).length > 25)
    assert.equal(new Set(locations(xml)).size, locations(xml).length)
    assert.ok(!xml.includes("<lastmod>") && !xml.includes("https://nav.programnotes.cn//"))
    assert.ok(!locations(xml).includes("https://nav.programnotes.cn/ai"))
    const robots = await (await fetch(base + "/robots.txt")).text()
    assert.ok(robots.includes("Sitemap: https://nav.programnotes.cn/sitemap.xml"))
    console.log(`Production smoke passed: SSR, article SEO/404, paused chat, ${locations(xml).length} sitemap URLs and robots`)
  } catch (error) {
    await delay(100)
    console.error(output)
    throw error
  } finally {
    server.kill("SIGTERM")
    await exited
  }
}

main().catch(error => { console.error(error); process.exitCode = 1 })
