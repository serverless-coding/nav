import assert from "node:assert/strict"
import test from "node:test"
import { navDataSchema } from "../lib/nav-schema"

const category = {
  id: "category-ai", title: "AI", icon: "", links: [
    { id: "tool-a", title: "A", url: "https://example.com", description: "" },
  ],
}

test("schema accepts cross-category duplicates but rejects duplicates within a category", () => {
  assert.ok(navDataSchema.safeParse({ data: [category, { ...category, id: "category-other", links: [{ ...category.links[0], id: "tool-b" }] }] }).success)
  assert.ok(!navDataSchema.safeParse({ data: [{ ...category, links: [...category.links, { ...category.links[0], id: "tool-b" }] }] }).success)
})

test("schema rejects unsafe URLs, traversal and duplicate IDs", () => {
  for (const patch of [{ url: "javascript:alert(1)" }, { url: "//example.com" }, { page: "../secret.md" }, { id: "" }]) {
    assert.ok(!navDataSchema.safeParse({ data: [{ ...category, links: [{ ...category.links[0], ...patch }] }] }).success)
  }
  assert.ok(!navDataSchema.safeParse({ data: [category, { ...category, title: "Duplicate" }] }).success)
})
