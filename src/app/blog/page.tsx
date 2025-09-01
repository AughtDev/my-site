import React from 'react';
import Link from "next/link";
import path from "node:path";
import fs from "node:fs";
import {fileNameToSlug, slugToTitle} from "@/utils/strings";

interface BlogPostMetaData {
    title: string
    slug: string
}

export default function Blog() {
    const blog_posts: BlogPostMetaData[] = React.useMemo(() => {
        const posts_dir = path.join(process.cwd(), 'content', 'blog');
        const filenames = fs.readdirSync(posts_dir);

        return filenames.map((filename) => {
            const slug = fileNameToSlug(filename);
            return {
                title:slugToTitle(slug), slug
            }
        })
    }, []);

    return (
        <div className="flex flex-col align-center w-full">
            <div className="flex flex-row align-center justify-center w-full">
                <h1 className="text-3xl font-bold">
                    Blog Page
                </h1>
            </div>
            <div className={"flex flex-col align-center px-4 gap-8 mt-8"}>
                {blog_posts.map(({slug,title}) => (
                    <div key={slug} className="flex flex-row justify-center w-full">
                        <Link href={`/blog/${slug}`} className={"hover:underline hover:text-red-300"}>
                            {title}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}
