import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import getNavLinks from "@/app/links"
import { Sidebar } from "@/components/sidebar"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { LinkContent } from "@/components/link-content"
import JsonLd from "@/components/JsonLd"
import { siteConfig } from "@/config/site"

export const dynamicParams = true
export const revalidate = 86400

async function getCategory(slug: string) {
  const cats = await getNavLinks()
  return { cats, cat: cats.find((c) => c.id === slug) }
}

function describe(title: string, names: string[], total: number) {
  return `精选${total}个${title}工具与资源，包括${names.slice(0, 5).join("、")}等，附简介、官网链接与使用教程，由${siteConfig.name}持续整理更新。`
}

export async function generateStaticParams() {
  const cats = await getNavLinks()
  return cats.map((c) => ({ slug: c.id }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { cat } = await getCategory(params.slug)
  if (!cat) return {}
  const title = `${cat.title}工具大全（${cat.links.length}个）`
  const description = describe(cat.title, cat.links.map((l) => l.title), cat.links.length)
  const url = `/category/${cat.id}`
  return {
    title,
    description,
    keywords: [cat.title, `${cat.title}工具`, `${cat.title}导航`, ...cat.links.slice(0, 8).map((l) => l.title)],
    alternates: { canonical: url },
    openGraph: { type: "website", url, title, description, siteName: siteConfig.name, locale: "zh_CN" },
    twitter: { card: "summary", title, description },
  }
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const { cats, cat } = await getCategory(params.slug)
  if (!cat) notFound()

  const navItems = cats.map((c) => ({ title: c.title, icon: c.icon, id: c.id }))
  const base = siteConfig.baseUrl
  const url = `${base}/category/${cat.id}`
  const description = describe(cat.title, cat.links.map((l) => l.title), cat.links.length)
  const others = cats.filter((c) => c.id !== cat.id)

  const ld = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${url}#webpage`,
      url,
      name: `${cat.title}工具大全`,
      description,
      inLanguage: "zh-CN",
      isPartOf: { "@id": `${base}/#website` },
      mainEntity: {
        "@type": "ItemList",
        name: cat.title,
        numberOfItems: cat.links.length,
        itemListElement: cat.links.map((l, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: l.title,
          description: l.description,
          url: l.page ? `${base}/page/${l.page.replace(/\.md$/, "")}` : l.url,
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "首页", item: base },
        { "@type": "ListItem", position: 2, name: cat.title, item: url },
      ],
    },
  ]

  return (
    <div className="container relative mx-auto min-h-screen w-full px-0 bg-slate-50/30 dark:bg-background">
      <JsonLd data={ld} />
      <div className="flex">
        <aside className="fixed z-20 hidden min-h-screen w-[16rem] sm:block border-r bg-background/60 backdrop-blur-xl">
          <Sidebar navItems={navItems} activeId={cat.id} />
        </aside>
        <main className="sm:pl-[16rem] w-full">
          <SiteHeader navItems={navItems} />

          <div className="mx-auto w-full px-4 pt-6 md:px-6">
            <nav aria-label="面包屑" className="mb-3 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground">首页</Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">{cat.title}</span>
            </nav>
            <h1 className="text-3xl font-bold tracking-tight">{cat.title}工具大全</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">{description}</p>
          </div>

          <LinkContent navResources={[cat]} hideMore />

          <section className="mx-auto w-full px-4 pb-6 md:px-6">
            <h2 className="mb-3 text-xl font-semibold">其他分类</h2>
            <ul className="flex flex-wrap gap-2">
              {others.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/category/${c.id}`}
                    className="inline-block rounded-full border px-4 py-1.5 text-sm text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  >
                    {c.title}（{c.links.length}）
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <SiteFooter />
        </main>
      </div>
    </div>
  )
}
