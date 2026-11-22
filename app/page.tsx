import { Suspense } from "react"
import { Sidebar } from "@/components/sidebar"
import getNavLinks, { filterNavLinks } from "./links"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import InpageSearch from "@/components/inpage-search"
import { LinkContent } from "@/components/link-content"
import JsonLd from "@/components/JsonLd"
import { siteConfig } from "@/config/site"

export const revalidate = 86400

interface IndexPageProps {
  searchParams?: { q?: string | string[]; subject?: string | string[] }
}

const first = (v?: string | string[]) => (Array.isArray(v) ? v[0] : v) || ""

export default async function IndexPage({ searchParams }: IndexPageProps) {
  const navResources = await getNavLinks();
  const navItems = navResources.map((n) => ({
    title: n.title,
    icon: n.icon,
    id: n.id,
  }))

  // 在服务端完成筛选，链接列表直接输出到 HTML，对搜索引擎和 AI 爬虫可见
  const q = first(searchParams?.q)
  const subject = first(searchParams?.subject)
  const filtered = filterNavLinks(navResources, q, subject)

  // 首页结构化数据：CollectionPage + 每个分类一个 ItemList（始终基于完整数据）
  const base = siteConfig.baseUrl
  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${base}/#webpage`,
    url: base,
    name: siteConfig.title,
    description: siteConfig.description,
    inLanguage: "zh-CN",
    isPartOf: { "@id": `${base}/#website` },
    hasPart: navResources.map((cat) => ({
      "@type": "ItemList",
      "@id": `${base}/#${cat.id}`,
      name: cat.title,
      numberOfItems: cat.links.length,
      itemListElement: cat.links.map((l, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: l.title,
        description: l.description,
        url: l.page ? `${base}/page/${l.page.replace(/\.md$/, "")}` : l.url,
      })),
    })),
  }

  return (
    <div className="container relative mx-auto min-h-screen w-full px-0 bg-slate-50/30 dark:bg-background">
      <JsonLd data={collectionLd} />
      <div className="flex">
        <aside className="fixed z-20 hidden min-h-screen w-[16rem] transition-all duration-300 ease-in-out sm:block border-r bg-background/60 backdrop-blur-xl">
          <Sidebar navItems={navItems} />
        </aside>
        <main className="sm:pl-[16rem] w-full transition-all">
          <SiteHeader navItems={navItems} />

          {/* 页面唯一的 h1 */}
          <h1 className="sr-only">ProgramNotes程序导航 - AI工具、开发工具、程序员资源导航</h1>

          {/* 搜索组件区域 */}
          <div className="w-full mb-6 mt-2.5">
            <Suspense fallback={<div className="h-[180px]" />}>
              <InpageSearch />
            </Suspense>
          </div>

          <LinkContent navResources={filtered} activeSubject={subject} activeQuery={q} />

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
        </main>
      </div>
    </div>
  )
}
