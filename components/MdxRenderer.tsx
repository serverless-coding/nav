"use client";

import { MDXRemote } from "next-mdx-remote/rsc";

const components = {
    h1: (props: any) => <h1 className="text-3xl font-bold" {...props} />,
    // Add more custom components as needed
};

export function MdxRenderer({ source }: { source: string }) {
    return <MDXRemote source={source} components={components} />;
}