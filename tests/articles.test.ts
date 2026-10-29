import assert from "node:assert/strict"
import test from "node:test"
import { JSDOM } from "jsdom"
import { addReferral, loadArticle, articleMetadata } from "../lib/articles"

test("article lookup rejects missing files and unsafe slugs without hiding valid pages", () => {
  for (const slug of ["missing-review-page", "../README", "about.md", "a/b"]) assert.equal(loadArticle(slug), null)
  assert.equal(loadArticle("about")?.title, "AI工具箱")
  assert.ok(loadArticle("free")?.description)
})

test("article metadata belongs to the article rather than the homepage", () => {
  const article = loadArticle("trae")!
  const metadata = articleMetadata(article)
  assert.deepEqual(metadata.alternates, { canonical: "/page/trae" })
  assert.equal(metadata.openGraph?.url, "https://nav.programnotes.cn/page/trae")
  assert.ok(metadata.description)
  assert.ok(!article.title.includes("["))
})

test("article heading anchors stay unique", () => {
  const document = new JSDOM(loadArticle("siliconflow")!.html).window.document
  const ids = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map(heading => heading.id)
  assert.equal(new Set(ids).size, ids.length)
  assert.ok(ids.every(Boolean))
})

test("referral preserves queries, hashes, existing referrals and local links", () => {
  const url = new URL(addReferral("https://example.com/signin?link=ABC#start"))
  assert.equal(url.searchParams.get("link"), "ABC")
  assert.equal(url.hash, "#start")
  assert.equal(url.searchParams.get("ref"), "https://nav.programnotes.cn")
  assert.equal(addReferral("https://example.com/?ref=original"), "https://example.com/?ref=original")
  assert.equal(addReferral("/page/about"), "/page/about")
})
