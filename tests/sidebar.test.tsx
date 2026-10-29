import assert from "node:assert/strict"
import test from "node:test"
import React from "react"
import { renderToString } from "react-dom/server"
import { JSDOM } from "jsdom"
import { Sidebar } from "../components/sidebar"
import { NavSearchProvider } from "../components/nav-search-provider"
import getNavLinks from "../app/links"

test("category navigation exposes keyboard-accessible stable fragment links", async () => {
  const categories = (await getNavLinks()).map(category => ({ ...category, icon: "/red.svg" }))
  const html = renderToString(<NavSearchProvider categories={categories}><Sidebar navItems={categories} /></NavSearchProvider>)
  const document = new JSDOM(html).window.document
  const links = document.querySelectorAll('nav a[href^="#category-"]')
  assert.equal(links.length, 17)
  assert.equal(links[0].getAttribute("href"), `#${categories[0].id}`)
  assert.equal(links[0].textContent, categories[0].title)
})
