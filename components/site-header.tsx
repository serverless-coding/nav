import Link from "next/link"
import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { SidebarProps } from "./sidebar"

export function SiteHeader({ navItems }: SidebarProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-background dark:border-slate-50/[0.06] lg:border-b lg:border-slate-900/10">
      {/* 站点标识 */}
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3614504270218797"
        crossOrigin="anonymous"></script>
      <meta name="msvalidate.01" content="B6FE76A783A1770409EC903DE2C7AC6A" />
      <script defer src="https://cloud.umami.is/script.js" data-website-id="24038dd3-5c82-4fff-86dd-be73d8b1731b"></script>
      {/* 站点标识 */}
      <div className="container flex h-16 items-center px-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} navItems={navItems} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            {/*github 图标 暂时隐藏*/}
            {/* <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "sm",
                  variant: "ghost",
                })}
              >
                <Icons.gitHub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link> */}
            {/*反馈*/}
            <Link
              href={siteConfig.links.feedbackUrl}
              target="_blank"
              rel="noreferrer"
              title="反馈"
            >
              <div
                className={`group relative ${buttonVariants({
                  size: "sm",
                  variant: "ghost",
                })}`}
              >
                <Icons.feedback className="h-5 w-5" />
                <span className="sr-only">Feedback</span>
              </div>
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
