import assert from "node:assert/strict"
import test from "node:test"
import getNavLinks from "../app/links"
import linksData from "../data/links.json"

test("navigation data stays identical across builds", async () => {
  assert.deepEqual(await getNavLinks(), await getNavLinks())
})

test("categories have persistent IDs and links do not duplicate within a category", async () => {
  const categories = await getNavLinks()
  assert.equal(categories.length, 17)
  const ids = new Set<string>()
  for (const category of categories) {
    assert.ok(category.id)
    assert.ok(!ids.has(category.id))
    ids.add(category.id)
    assert.equal(new Set(category.links.map(link => link.url)).size, category.links.length)
    for (const link of category.links) {
      assert.ok(!ids.has(link.id))
      ids.add(link.id)
    }
  }
  assert.ok(categories.reduce((sum, category) => sum + category.links.length, 0) < 249)
})

test("internal resources use a local icon and missing descriptions stay empty", async () => {
  const links = (await getNavLinks()).flatMap(category => category.links)
  assert.ok(links.filter(link => link.url.startsWith("/")).every(link => link.icon.startsWith("/")))
  for (const raw of linksData.data.flatMap(category => category.links)) {
    if (!raw.description) {
      assert.equal(links.find(link => link.url === raw.url)?.description, "")
    }
  }
})
