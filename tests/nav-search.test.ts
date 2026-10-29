import assert from "node:assert/strict"
import test from "node:test"
import { filterNavResources, searchHref } from "../lib/nav-search"
import getNavLinks from "../app/links"

test("search combines case-insensitive text and subjects", async () => {
  const categories = await getNavLinks()
  const result = filterNavResources(categories, { q: "  CURSOR ", subject: "" })
  assert.ok(result.flatMap(category => category.links).some(link => link.title === "Cursor"))
  assert.deepEqual(filterNavResources(categories, { q: "no-such-resource-review", subject: "" }), [])
  const fixture = [{ ...categories[0], links: [
    { ...categories[0].links[0], title: "Example", subject: ["Code", "AI"] },
    { ...categories[0].links[0], id: "other", title: "Example", subject: "Music" },
  ] }]
  assert.equal(filterNavResources(fixture, { q: "example", subject: " code " })[0].links.length, 1)
  assert.equal(filterNavResources(fixture, { q: "missing", subject: "code" }).length, 0)
})

test("search URLs clear empty queries without losing subjects", () => {
  assert.equal(searchHref({ q: "  ", subject: "" }), "/")
  assert.equal(searchHref({ q: "", subject: "AI生成" }), "/?subject=AI%E7%94%9F%E6%88%90")
  assert.equal(searchHref({ q: "A&B", subject: "code" }), "/?q=A%26B&subject=code")
})
