"use client";

interface ClientMarkdownContentProps {
    htmlContent: string;
}

export default function ClientMarkdownContent({ htmlContent }: ClientMarkdownContentProps) {
    return (
        <article
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
    );
}