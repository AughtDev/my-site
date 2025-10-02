import path from "node:path";
import fs from "node:fs";
import BlogPostContent from "@/components/blog/BlogPostContent";
import React from "react";
import {convertMarkdownFileToHtml} from "@/utils/markdown";

interface ProjectPageProps {
    params: {
        slug: string
    }
}


export async function generateStaticParams() {
    try {
        const posts_dir = path.join(process.cwd(), 'content', 'projects');
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

export default async function ProjectPage({params}: ProjectPageProps) {
    const {slug} = await params

    const file_path = path.join(process.cwd(), 'content', 'projects', `${slug}.md`)

    const html_content = await convertMarkdownFileToHtml(
        // fs.readFileSync(file_path, 'utf8')
        file_path
    )

    if (!html_content) {
        return (
            <div className={"flex flex-col w-full items-center justify-center"}>
                <p className={"text-lg"}>
                    This project does not exist.
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
