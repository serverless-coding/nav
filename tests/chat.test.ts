import assert from "node:assert/strict"
import test from "node:test"
import { POST } from "../app/api/chat/route"

test("paused chat rejects requests before parsing or calling providers", async () => {
  for (const body of [undefined, "not json", JSON.stringify({ messages: [] })]) {
    const response = await POST(new Request("http://localhost/api/chat", {
      method: "POST",
      body,
    }))
    assert.equal(response.status, 503)
    assert.equal(response.headers.get("Cache-Control"), "no-store")
    assert.ok(response.headers.get("Retry-After"))
    assert.equal((await response.json()).error, "CHAT_UNAVAILABLE")
  }
})
