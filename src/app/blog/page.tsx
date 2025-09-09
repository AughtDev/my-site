import React from 'react';
import Link from "next/link";
import path from "node:path";
import fs from "node:fs";
import {fileNameToSlug, slugToTitle} from "@/utils/strings";
import BlogPostsList, {BlogPostMetaData} from "@/components/blog/PostsList";

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
        <div className="flex flex-col items-center w-full h-full">
            <BlogPostsList posts={blog_posts}/>
        </div>
    )
}
