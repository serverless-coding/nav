import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "AI 聊天暂时暂停",
  alternates: { canonical: "/ai" },
  robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
}

export default function Page() {
  return (
    <main className="container flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
      <h1 className="text-3xl font-bold">AI 聊天暂时暂停</h1>
      <p className="text-muted-foreground">你仍然可以在导航站发现和使用其他 AI 工具。</p>
      <Link href="/" className="text-primary underline">返回导航首页</Link>
    </main>
  )
}
