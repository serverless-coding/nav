export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "科技导航",
  description:
    "Discover a variety of AI tools, frameworks, and resources for developers on this comprehensive platform. Explore now!",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
  ],
  links: {
    github: "https://github.com/serverless-coding/frontend-nav",
    docs: "",
  },
  icon: {
    site: "/layered-waves.svg",
    default: "/low-poly-grid.svg",
  }
}
