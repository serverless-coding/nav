import { notFound } from "next/navigation";
import fs from "fs/promises";
import path from "path";
import { MdxRenderer } from "@/components/MdxRenderer";

// 验证 slug 是否合法
function isValidSlug(slug: string) {
    return /^[a-zA-Z0-9-]+$/.test(slug);
}

export default async function Page({ params }: { params: { slug: string } }) {
    if (!isValidSlug(params.slug)) {
        return notFound();
    }

    const filePath = path.join(process.cwd(), "public", "pages", `${params.slug}.md`);

    try {
        const markdown = await fs.readFile(filePath, "utf8");
        return (
            <div className="container mx-auto max-w-4xl py-8">
                <article className="prose dark:prose-invert max-w-none">
                    <MdxRenderer source={markdown} />
                </article>
            </div>
        );
    } catch (error) {
        return notFound();
    }
}