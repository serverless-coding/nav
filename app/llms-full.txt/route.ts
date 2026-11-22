import { buildLlmsTxt } from "@/lib/llms"

export const dynamic = "force-static"
export const revalidate = 86400

export async function GET() {
  const body = await buildLlmsTxt(true)
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
