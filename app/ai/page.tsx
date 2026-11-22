import type { Metadata } from "next"
import Chat from "@/components/chat";

export const metadata: Metadata = {
  title: "AI聊天 - 免费在线AI对话",
  description: "在线免费使用的AI聊天助手，支持多种大模型切换，可用于问答、写作、翻译和编程辅助。",
  alternates: { canonical: "/ai" },
}

export default function Page() {
  return <Chat />;
}
