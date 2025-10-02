import React from "react";

import path from "node:path";
import * as fs from "node:fs";
import BlogPostContent from "@/components/blog/BlogPostContent";
import {convertMarkdownFileToHtml} from "@/utils/markdown";


interface BlogPostProps {
    params: {
        slug: string
    }
}


export async function generateStaticParams() {
    try {
        const posts_dir = path.join(process.cwd(), 'content', 'blog');
        const filenames = fs.readdirSync(posts_dir);

        return filenames.map((filename) => {
            return {
                slug: filename.replace(/\.md$/, '')
            }
        })
    } catch {
        return []
    }
}

export default async function BlogPost({params}: BlogPostProps) {
    const {slug} = await params

    const file_path = path.join(process.cwd(), 'content', 'blog', `${slug}.md`)

    const html_content = await convertMarkdownFileToHtml(
        file_path
         // fs.readFileSync(file_path, 'utf8')
    )

    if (!html_content) {
        return (
            <div className={"flex flex-col w-full items-center justify-center"}>
                <p className={"text-lg"}>
                    This blog post does not exist.
                </p>
            </div>
        )
    }

    return (
        <div className={"flex flex-col w-full items-center"}>
            <BlogPostContent html_content={html_content}/>
        </div>
    )

}

