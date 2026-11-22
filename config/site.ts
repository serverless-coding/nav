export type SiteConfig = typeof siteConfig

export const siteConfig = {
  baseUrl: "https://nav.programnotes.cn",
  // 统一品牌名：title / OG / JSON-LD 都从这里取
  name: "ProgramNotes程序导航",
  shortName: "ProgramNotes",
  title: "ProgramNotes程序导航 - AI工具、开发工具、程序员资源导航",
  description:
    "ProgramNotes程序导航，精选AI工具、编程开发工具、效率工具、设计资源和技术社区，为程序员提供高质量互联网资源导航。",
  mainNav: [
    {
      title: "首页",
      href: "/",
    },
    {
      title: "关于",
      href: "/page/about",
    },
    {
      title: "镜像加速",
      href: "/page/mirror",
    },
    {
      title: "AI聊天",
      href: "/ai",
    },
    {
      title: "开发工具",
      href: "/page/devtool",
    },
    {
      title: "免费资源",
      href: "/page/free",
    },
    {
      title: "流量卡",
      href: "/page/haoka",
    }
  ],
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
