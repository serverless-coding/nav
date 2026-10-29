import navigation from "./navigation.json"
import urlConfig from "./url.json"

export type SiteConfig = typeof siteConfig

export const siteConfig = {
  baseUrl: urlConfig.baseUrl,
  name: "AI工具箱",
  siteName: "AI工具箱 - ProgramNotes",
  description:
    "AI工具箱是程序员和创作者的资源导航站，精选AI工具、开发工具、免费资源、影视音乐工具与流量卡优惠，帮助用户快速发现优质互联网服务。",
  keywords: [
    "AI工具箱",
    "AI工具导航",
    "程序员导航",
    "开发工具",
    "免费资源",
    "AI生成工具",
    "流量卡",
    "在线工具",
  ],
  author: "ProgramNotes",
  creator: "ProgramNotes",
  locale: "zh_CN",
  mainNav: navigation,
  links: {
    github: "https://github.com/serverless-coding/frontend-nav",
    // 反馈表单
    feedbackUrl: "https://rq2uwmrn0w.feishu.cn/share/base/form/shrcnO1rGw4pZt5FTRkBJ2O62ed",
    docs: "",
  },
  icon: {
    site: "/red.svg",
    default: "/red.svg",
  }
}
