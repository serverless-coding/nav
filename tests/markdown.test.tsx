import assert from "node:assert/strict"
import test from "node:test"
import React from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { JSDOM } from "jsdom"
import { Markdown } from "../components/markdown"

test("Markdown links without a safe destination remain readable", () => {
  const html = renderToStaticMarkup(<Markdown>{"[unsafe](javascript:alert)"}</Markdown>)
  const document = new JSDOM(html).window.document
  assert.equal(document.body.textContent, "unsafe")
  assert.equal(document.querySelector("a[href]"), null)
})

test("Markdown preserves safe external links", () => {
  const html = renderToStaticMarkup(<Markdown>{"[docs](https://example.com/docs)"}</Markdown>)
  const anchor = new JSDOM(html).window.document.querySelector("a")
  assert.equal(anchor?.href, "https://example.com/docs")
  assert.equal(anchor?.target, "_blank")
})
