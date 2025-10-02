"use client"
import React from 'react';
import useMediaType from "@/utils/hooks/useMediaType";
import BlogPostCard from "@/components/blog/BlogPostCard";

export interface BlogPostMetaData {
    title: string
    slug: string
    description?: string
    unix_timestamp: number
}

interface BlogPostsListProps {
    posts: BlogPostMetaData[];
}

export default function BlogPostsList({posts}: BlogPostsListProps) {
    const {is_desktop, is_tablet} = useMediaType()

    const list_div_class_name: string = React.useMemo(() => {
        let class_name = "flex flex-col gap-4"
        if (is_desktop) {
            class_name += " w-4/6 items-center mr-16 pt-8"
        } else if (is_tablet) {
            class_name += " w-4/6 items-center pt-24"
        } else {
            class_name += " w-full items-start pt-26 px-4"
        }
        return class_name
    }, [is_desktop, is_tablet]);

    return (
        <div
            className={list_div_class_name}>
            {posts.length > 0 ? posts.map(blogpost => (
                <BlogPostCard key={blogpost.slug} blogpost={blogpost}/>
            )) : (
                <div
                    style={{
                        height: "50vh"
                    }}
                    className={"w-full flex items-center justify-center"}>
                    <h2 className={"text-3xl text-center"}>
                        No Blog Posts Yet :(
                    </h2>
                </div>
            )}
        </div>
    )
}
