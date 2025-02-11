import { remark } from "remark";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeSlug from "rehype-slug";
import { visit } from "unist-util-visit";
import { Node } from 'unist';

// 自定义插件来处理图片
function rehypeImageSize() {
    return (tree: Node) => {
        visit(tree, 'element', (node) => {
            if (node.tagName === 'img') {
                node.properties = node.properties || {};
                node.properties.style = 'max-width: 100%; max-height: 70vh; width: auto; height: auto; object-fit: contain; display: block; margin: 1rem auto;';
            }
        });
    };
}

export async function markdownToHtml(markdown: string) {
    const result = await remark()
        .use(remarkGfm)
        .use(remarkRehype)
        .use(rehypeSlug)
        .use(rehypeImageSize)
        .use(rehypeHighlight)
        .use(rehypeStringify)
        .process(markdown);
    return result.toString();
}

interface MarkdownContentProps {
    htmlContent: string;
}

export default async function MarkdownContent({ htmlContent }: MarkdownContentProps) {
    return (
        <div className="mt-16">
            <div className="flex flex-col lg:flex-row lg:gap-8">
                <div className="w-full lg:w-4/5 lg:mr-8">
                    <div
                        className="markdown-body"
                        dangerouslySetInnerHTML={{ __html: htmlContent }}
                        style={{
                            lineHeight: 1.6, // 增加行高
                        }}
                    />
                    {/* 建议添加到全局 CSS 或使用 Tailwind CSS */}
                    {/*
                    .markdown-body h1, .markdown-body h2, .markdown-body h3, .markdown-body h4, .markdown-body h5, .markdown-body h6 {
                        font-weight: bold;
                        margin-top: 1.5rem;
                        margin-bottom: 1rem;
                    }
                    .markdown-body h1 { font-size: 2rem; }
                    .markdown-body h2 { font-size: 1.75rem; }
                    .markdown-body h3 { font-size: 1.5rem; }
                    .markdown-body a {
                        color: #007bff; // 示例链接颜色
                        text-decoration: underline;
                    }
                    */}
                </div>
            </div>
        </div>
    );
}
