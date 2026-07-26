import { Sidebar } from "@/components/sidebar"
import getNavLinks from "./links"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import InpageSearch from "@/components/inpage-search"
import { Suspense } from "react"
import { IndexContent } from "./pageClient"

export const revalidate = 24 * 60 * 60;

export default async function IndexPage() {
  const navResources = await getNavLinks();
  const navItems = navResources.map((n: { title: any; icon: any; id: any }) => ({
    title: n?.title,
    icon: n?.icon,
    id: n?.id,
  }))
  return (
    // 建议给整个页面一个非常淡的灰色背景，让搜索框的白色能凸显出来
    <div className="container relative mx-auto min-h-screen w-full px-0 bg-slate-50/30 dark:bg-background">
      <div className="flex">
        <div className="fixed z-20 hidden min-h-screen w-[16rem] transition-all duration-300 ease-in-out sm:block border-r bg-background/60 backdrop-blur-xl">
          <Sidebar navItems={navItems} />
        </div>
        <div className="sm:pl-[16rem] w-full transition-all">
          <SiteHeader navItems={navItems} />

          {/* 搜索组件区域 */}
          <div className="w-full mb-6 mt-2.5">
            <InpageSearch />
          </div>

          <Suspense>
            <IndexContent navResources={navResources} />
          </Suspense>

          <section className="mx-auto mt-12 max-w-4xl px-6 pb-2 text-center text-muted-foreground">
            <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground">
              程序员导航与AI工具资源库
            </h2>
            <p className="text-sm leading-7">
              ProgramNotes程序导航收集优秀的人工智能工具、开发工具、在线工具和技术资源，帮助开发者快速发现
              ChatGPT、Claude、GitHub、Cursor、Vercel 等热门工具，提升开发效率。
            </p>
          </section>

          <SiteFooter />
        </div>
      </div>
    </div>
  )
}
