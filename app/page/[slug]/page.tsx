import { sanitizeDocument, escapeHtml } from '@/lib/sanitize';
import JsonLd from '@/components/JsonLd';
import { getCategorySlug } from '@/app/links';
import fs from 'fs';
import path from 'path';
import { marked } from 'marked';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import TableOfContents from './table-of-content';
import ClientMarkdownContent from './markdown-content';
import { Metadata } from 'next';
import { JSDOM } from 'jsdom';
import { siteConfig } from '@/config/site';
import { notFound } from 'next/navigation';
import { getAllPageSlugs, getPageMeta, pageExists } from '@/lib/pages';

// Configure marked with header IDs
const renderer = new marked.Renderer();

// 预生成 pages/ 下所有 md；未预生成的 slug 在运行时按需渲染，
// 文件不存在时由下方 pageExists() 判断返回 404
export const dynamicParams = true;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;
  if (!pageExists(slug)) return {};
  const meta = getPageMeta(slug);
  const url = `/page/${slug}`;
  const images = meta.image ? [{ url: meta.image }] : undefined;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: meta.title,
      description: meta.description,
      siteName: siteConfig.name,
      locale: 'zh_CN',
      modifiedTime: meta.updated.toISOString(),
      images,
    },
    twitter: {
      card: images ? 'summary_large_image' : 'summary',
      title: meta.title,
      description: meta.description,
      images: meta.image ? [meta.image] : undefined,
    },
  };
}

renderer.heading = (text, level) => {
  const escapedText = text
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fa5]+/g, '-') // Replace non-word chars (except Chinese) with -
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing -

  return `
    <h${level} id="${escapedText}">
      ${text}
    </h${level}>
  `;
};

marked.setOptions({
  renderer,
  gfm: true,
});

export async function generateStaticParams() {
  // 预生成 pages/ 下所有 md（包括 about/mirror/devtool/free/haoka 等导航页）
  return getAllPageSlugs().map(slug => ({ slug }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  if (!pageExists(slug)) notFound();
  const meta = getPageMeta(slug);
  const { content } = meta;
  let htmlContent = await marked(content);

  // Add alt attributes to images
  const dom = new JSDOM(htmlContent);
  const images = dom.window.document.querySelectorAll('img');

  images.forEach((img: HTMLImageElement) => {
    if (!img.alt) {
      const src = img.src;
      const filename = src.substring(src.lastIndexOf('/') + 1);
      img.alt = filename;
    }
  });

  // Get links data
  const links = (await import('@/data/links.json')).default;
  const currentPage = `${slug}.md`;
  let categoryTitle = '';
  let currentUrl = '';
  let prevLink: { page?: string; title?: string } | null = null;
  let nextLink: { page?: string; title?: string } | null = null;

  // Find current page's category and position
  for (const category of links.data) {
    const linkIndex = category.links.findIndex(link => link.page === currentPage);
    if (linkIndex !== -1) {
      categoryTitle = category.title;
      // Save the current page's url
      currentUrl = category.links[linkIndex].url;
      if (linkIndex > 0) {
        prevLink = category.links[linkIndex - 1];
      }
      if (linkIndex < category.links.length - 1) {
        nextLink = category.links[linkIndex + 1];
      }
      break;
    }
  }

  // Insert navigation links after h1
  // 先清洗 markdown 渲染结果，再插入由数据生成的导航（数据字段做转义）
  sanitizeDocument(dom.window.document);
  const h1 = dom.window.document.querySelector('h1');
  if (h1) {
    const nav = dom.window.document.createElement('div');
    nav.className = 'flex justify-between items-center mt-4 mb-8 text-sm text-muted-foreground';

    const safeUrl = /^https?:\/\//i.test(currentUrl) ? currentUrl : '';
    const refUrl = safeUrl ? `${safeUrl}${safeUrl.includes('?') ? '&' : '?'}ref=${encodeURIComponent(siteConfig.baseUrl)}` : '';
    const pageHref = (p?: string) => `/page/${encodeURIComponent((p || '').replace(/\.md$/, ''))}`;
    nav.innerHTML = `
      <div class="space-x-4">
      ${categoryTitle ? `
        <span>分类：${escapeHtml(categoryTitle)}</span>
        ${refUrl ? `<a href="${escapeHtml(refUrl)}" target="_blank" rel="noopener noreferrer" class="hover:text-foreground">前往官网</a>` : ''}
      ` : ''}
      </div>
      <div class="space-x-4">
      ${prevLink?.page ? `<a href="${pageHref(prevLink.page)}" class="hover:text-foreground">← ${escapeHtml(prevLink.title || '')}</a>` : ''}
      ${nextLink?.page ? `<a href="${pageHref(nextLink.page)}" class="hover:text-foreground">${escapeHtml(nextLink.title || '')} →</a>` : ''}
      </div>
    `;

    h1.parentNode?.insertBefore(nav, h1.nextSibling);
  }

  htmlContent = dom.window.document.body.innerHTML;

  // 详情页结构化数据：Article（含工具信息）+ BreadcrumbList
  const base = siteConfig.baseUrl;
  const pageUrl = `${base}/page/${slug}`;
  const toolLink = links.data.flatMap(c => c.links).find((l: any) => l.page === currentPage) as any;
  const articleLd: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${pageUrl}#article`,
    headline: meta.title,
    description: meta.description,
    url: pageUrl,
    mainEntityOfPage: pageUrl,
    inLanguage: 'zh-CN',
    dateModified: meta.updated.toISOString(),
    author: { '@id': `${base}/#organization` },
    publisher: { '@id': `${base}/#organization` },
    isPartOf: { '@id': `${base}/#website` },
    ...(meta.image ? { image: meta.image.startsWith('http') ? meta.image : `${base}${meta.image}` } : {}),
    ...(meta.keywords.length ? { keywords: meta.keywords.join(',') } : {}),
  };
  if (toolLink) {
    articleLd.about = {
      '@type': 'SoftwareApplication',
      name: toolLink.title,
      url: toolLink.url,
      description: toolLink.description,
      applicationCategory: categoryTitle || 'WebApplication',
      operatingSystem: 'Web',
    };
  }
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '首页', item: base },
      ...(categoryTitle ? [{ '@type': 'ListItem', position: 2, name: categoryTitle, item: `${base}/category/${getCategorySlug(categoryTitle, links.data.findIndex(c => c.title === categoryTitle))}` }] : []),
      { '@type': 'ListItem', position: categoryTitle ? 3 : 2, name: meta.title, item: pageUrl },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <JsonLd data={[articleLd, breadcrumbLd]} />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="mb-8 inline-flex items-center space-x-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>返回</span>
        </Link>

        <div className="flex gap-8">
          <TableOfContents />
          <article className="prose max-w-4xl flex-1 dark:prose-invert">
            <ClientMarkdownContent htmlContent={htmlContent} />
            <p className="mt-8 text-sm text-muted-foreground not-prose">
              最后更新：<time dateTime={meta.updated.toISOString()}>{meta.updated.toISOString().slice(0, 10)}</time> · 由 {siteConfig.name} 整理
            </p>
          </article>
        </div>
      </div>
    </div>
  );
}
