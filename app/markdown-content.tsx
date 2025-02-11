import { remark } from "remark";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeSlug from "rehype-slug";
import matter from "gray-matter";
import { visit } from "unist-util-visit";
import { Node } from 'unist';
import { toc } from 'mdast-util-toc';
import { inspect } from 'unist-util-inspect';

// 自定义插件来处理图片
function rehypeImageSize() {
    return (tree: Node) => {
        visit(tree, 'element', (node: any) => {
            if (node.tagName === 'img') {
                node.properties = node.properties || {};
                node.properties.style = 'max-width: 100%; max-height: 70vh; width: auto; height: auto; object-fit: contain; display: block; margin: 1rem auto;';
            }
        });
    };
}

export async function markdownToHtml(markdown: string) {
    const { data, content } = matter(markdown);
    const result = await remark()
        .use(remarkFrontmatter)
        .use(remarkGfm)
        .use(remarkRehype)
        .use(rehypeSlug)
        .use(rehypeImageSize)
        .use(rehypeHighlight, { detect: true, ignoreMissing: true })
        .use(rehypeStringify)
        .use(() => {
            return (tree: Node, file) => {
              console.log(inspect(tree));
              const table = toc(tree as any)
              file.data.toc = table.map
            }
          })
        .process(content);
    return {
        html: result.toString(),
        toc: result.data.toc
    }
}

interface MarkdownContentProps {
    htmlContent: string;
    frontmatter?: Record<string, any>;
    toc: any;
}

interface MarkdownContentProps {
    htmlContent: string;
    frontmatter?: Record<string, any>;
    toc: any;
}

export default function MarkdownContent({ htmlContent, frontmatter, toc }: MarkdownContentProps) {
    return (
        <div className="mt-16">
            <div className="flex flex-col lg:flex-row lg:gap-8">
                <div className="w-full lg:w-4/5 lg:mr-8">
                    {frontmatter?.title && <h1 className="text-2xl font-bold">{frontmatter.title}</h1>}
                    <div
                        className="markdown-body"
                        dangerouslySetInnerHTML={{ __html: htmlContent }}
                        style={{
                            lineHeight: 1.6, // 增加行高
                        }}
                    />
                </div>
                <aside className="w-full lg:w-1/5 mt-8 lg:mt-0">
                    <h3>目录</h3>
                    <ul>
                        {toc && toc.map((item: any, index: number) => (
                            <li key={index}>
                                <a href={item.url}>{item.title}</a>
                            </li>
                        ))}
                    </ul>
                </aside>
            </div>
        </div>
    );
}
