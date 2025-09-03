import React from 'react';
import Link from "next/link";
import path from "node:path";
import fs from "node:fs";
import {fileNameToSlug, slugToTitle} from "@/utils/strings";

interface BlogPostMetaData {
    title: string
    slug: string
    unix_timestamp: number
}

export default function Blog() {
    const blog_posts: BlogPostMetaData[] = React.useMemo(() => {
        const posts_dir = path.join(process.cwd(), 'content', 'blog');
        const filenames = fs.readdirSync(posts_dir);

        return filenames.map((filename) => {
            const slug = fileNameToSlug(filename);
            return {
                title: slugToTitle(slug), slug,
                // get the date when the file was created
                unix_timestamp: fs.statSync(path.join(posts_dir, filename)).birthtimeMs
            }
        })
    }, []);

    return (
        <div className="flex flex-col items-center w-full">
            <div className={"flex flex-col px-4 gap-8 mt-8 w-4/6 items-center mr-16"}>
                {blog_posts.map(({slug, title, unix_timestamp}) => (
                    <Link
                        key={slug}
                        style={{
                            width: '100%',
                            height: "2.5rem"
                        }}
                        href={`/blog/${slug}`}
                        className={"hover:underline hover:text-red-300"}>
                        <div className="flex flex-row justify-between align-center w-full">
                            <p> {title} </p>
                            <p className="text-gray-500 text-sm"> {
                                new Date(unix_timestamp).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })
                            } </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
