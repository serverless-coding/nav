export type SiteConfig = typeof siteConfig

export const siteConfig = {
  baseUrl: "https://nav.programnotes.cn",
  name: "AI工具箱",
  description:
    "AI工具箱,AI生成,影视,音乐,开发工具,免费资源,流量卡,Discover a variety of AI tools, frameworks, and resources for developers on this comprehensive platform",
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
