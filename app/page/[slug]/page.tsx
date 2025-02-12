import fs from 'fs';
import path from 'path';
import { marked } from 'marked';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import TableOfContents from './table-of-content';
import ClientMarkdownContent from './markdown-content';

// Configure marked with header IDs
const renderer = new marked.Renderer();
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
    const filePath = path.join(process.cwd(), 'pages', `${slug}.md`); // 保持不变,因为markdown文件确实在pages目录
    const content = fs.readFileSync(filePath, 'utf8');
    const htmlContent = await marked(content);

    return (
        <div className="min-h-screen bg-background">            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Link
                    href="/"
                    className="inline-flex items-center space-x-2 text-muted-foreground hover:text-foreground mb-8"
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span>返回</span>
                </Link>

                <div className="flex gap-8">
                    <TableOfContents />
                    <article className="flex-1 prose dark:prose-invert max-w-4xl">
                        <ClientMarkdownContent htmlContent={htmlContent} />
                    </article>
                </div>
            </div>
        </div>
    );
}
