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

// Configure marked with header IDs
const renderer = new marked.Renderer();

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;
  const filePath = path.join(process.cwd(), 'pages', `${slug}.md`);
  const content = fs.readFileSync(filePath, 'utf8');
  const firstHeading = content.match(/^#\s(.*?)$/m)?.[1] || 'Default Title';

  // Extract keywords from the first three headings
  const headings = [...content.matchAll(/^#+\s(.*?)$/gm)].slice(0, 3).map(match => {
    const linkMatch = match[1].match(/\[(.*?)\]\((.*?)\)/);
    return linkMatch ? linkMatch[1] : match[1];
  }).filter(heading => heading.trim() !== '');
  const keywords = headings.join(', ');

  return {
    title: firstHeading,
    keywords: keywords,
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
  const links = (await import('@/data/links.json')).default;
  const pages = links.data
    .flatMap(category => category.links)
    .filter((link): link is typeof link & { page: string } => Boolean(link.page))
    .map(link => ({
      slug: link.page.replace('.md', '')
    }));
  return pages;
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const filePath = path.join(process.cwd(), 'pages', `${slug}.md`);
  const content = fs.readFileSync(filePath, 'utf8');
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
  const h1 = dom.window.document.querySelector('h1');
  if (h1) {
    const nav = dom.window.document.createElement('div');
    nav.className = 'flex justify-between items-center mt-4 mb-8 text-sm text-muted-foreground';

    nav.innerHTML = `
      <div class="space-x-4">
      ${categoryTitle ? `
        <span>分类：${categoryTitle}</span>
        ${currentUrl ? `<a href="${currentUrl}?ref=${siteConfig.baseUrl || 'https://nav.programnotes.cn'}" target="_blank" class="hover:text-foreground">前往</a>` : ''}
      ` : ''}
      </div>
      <div class="space-x-4">
      ${prevLink?.page ? `<a href="/page/${prevLink.page?.replace('.md', '')}" class="hover:text-foreground">← ${prevLink.title}</a>` : ''}
      ${nextLink?.page ? `<a href="/page/${nextLink.page?.replace('.md', '')}" class="hover:text-foreground">${nextLink.title} →</a>` : ''}
      </div>
    `;

    h1.parentNode?.insertBefore(nav, h1.nextSibling);
  }

  htmlContent = dom.window.document.body.innerHTML;

  return (
    <div className="min-h-screen bg-background">
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
          </article>
        </div>
      </div>
    </div>
  );
}
