export async function POST(_req: Request) {
  return new Response(
    JSON.stringify({ error: "CHAT_UNAVAILABLE", message: "AI 聊天暂时暂停，请使用导航站发现其他工具。" }),
    {
      status: 503,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store",
        "Retry-After": "86400",
      },
    }
  )
}
