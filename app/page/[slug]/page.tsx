import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import TableOfContents from "./table-of-content"
import { addReferral, articleMetadata, loadArticle } from "@/lib/articles"
import linksData from "@/data/links.json"

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = loadArticle(params.slug)
  if (!article) notFound()
  return articleMetadata(article)
}

export function generateStaticParams() {
  const pages = linksData.data.flatMap(category => category.links).flatMap(link => "page" in link && link.page ? [link.page.replace(/\.md$/, "")] : [])
  return [...new Set(pages)].map(slug => ({ slug }))
}

export default function Page({ params }: { params: { slug: string } }) {
  const article = loadArticle(params.slug)
  if (!article) notFound()
  const category = linksData.data.find(category => category.links.some(link => "page" in link && link.page === `${params.slug}.md`))
  const resources = category?.links.filter(link => "page" in link && link.page) || []
  const index = resources.findIndex(link => "page" in link && link.page === `${params.slug}.md`)
  const resource = resources[index]
  const previous = resources[index - 1]
  const next = resources[index + 1]
  const detailHref = (link: { page?: string }) => `/page/${link.page?.replace(/\.md$/, "")}`

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link href="/" className="mb-8 inline-flex items-center space-x-2 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /><span>返回导航首页</span>
        </Link>
        {category && (
          <nav aria-label="文章导航" className="mb-8 flex flex-wrap justify-between gap-4 text-sm text-muted-foreground">
            <div className="space-x-4">
              <span>分类：{category.title}</span>
              {resource && <a href={addReferral(resource.url)} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">前往 {resource.title}</a>}
            </div>
            <div className="space-x-4">
              {previous && <Link href={detailHref(previous)}>← {previous.title}</Link>}
              {next && <Link href={detailHref(next)}>{next.title} →</Link>}
            </div>
          </nav>
        )}
        <div className="flex gap-8">
          <TableOfContents />
          <article className="prose min-w-0 max-w-4xl flex-1 dark:prose-invert" dangerouslySetInnerHTML={{ __html: article.html }} />
        </div>
      </div>
    </main>
  )
}
