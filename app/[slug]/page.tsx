import fs from 'fs';
import path from 'path';
import { MainNav as Navigation } from 'components/main-nav';
import MarkdownContent from '../markdown-content';
import getNavLinks from '../links';
import linksData from 'data/links.json';
import { SiteHeader } from 'components/site-header';
import { markdownToHtml } from '../markdown-content';
import matter from 'gray-matter';

export async function generateStaticParams() {
    const pagesPath = path.join(process.cwd(), 'pages');
    const files = fs.readdirSync(pagesPath);
    return files
        .filter(file => file.endsWith('.md') && !file.startsWith('serviceWorker'))
        .map(file => ({
            slug: file.replace('.md', ''),
        }));
}

export default async function Page({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const filePath = path.join(process.cwd(), 'pages', `${slug}.md`);
    const content = await fs.promises.readFile(filePath, 'utf8');
    const { data: frontmatter, content: markdownContent } = matter(content);
    const { html, toc } = await markdownToHtml(markdownContent);

    const navResources = await getNavLinks();
    const navItems = navResources.map((n: { title: any; icon: any; id: any }) => {
        return {
            title: n?.title,
            icon: n?.icon,
            id: n?.id,
        };
    });

    const relevantLinks = linksData.data.flatMap(category =>
        category.links.filter(link => link.page === `${slug}.md`)
    );

    return (
        <div className="min-h-screen bg-background">
            <SiteHeader navItems={navItems} />
            <Navigation navItems={navItems} />
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <MarkdownContent htmlContent={html} frontmatter={frontmatter} toc={toc} />
                {relevantLinks.length > 0 && (
                    <div>
                        <h3>相关链接</h3>
                        <ul>
                            {relevantLinks.map(link => (
                                <li key={link.url}>
                                    <a href={link.url}>{link.title}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </main>
        </div>
    );
}
