export type SiteConfig = typeof siteConfig

export const siteConfig = {
  baseUrl: "https://nav.programnotes.cn",
  name: "科技导航",
  description:
    "Discover a variety of AI tools, frameworks, and resources for developers on this comprehensive platform. Explore now!",
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
      title: "镜像加速工具",
      href: "/page/mirror",
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
