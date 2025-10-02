import React from 'react';
import path from "node:path";
import fs from "node:fs";
import BlogPostsList, {BlogPostMetaData} from "@/components/blog/PostsList";
import {getBlogPostMetaData} from "@/utils/markdown";

export default function Blog() {
    const blog_posts: BlogPostMetaData[] = React.useMemo(() => {
        const posts_dir = path.join(process.cwd(), 'content', 'blog');
        let filenames: string[] = [];
        try {
            filenames = fs.readdirSync(posts_dir);
        } catch {
            return []
        }

        return filenames.map((filename) => {
            const file_path = path.join(process.cwd(), 'content', 'blog', filename)
            return getBlogPostMetaData(file_path);
        }).filter(Boolean) as BlogPostMetaData[];
    }, []);

    return (
        <div className="flex flex-col items-center w-full h-full">
            <BlogPostsList posts={blog_posts}/>
        </div>
    )
}
