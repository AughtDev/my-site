"use client"
import React from 'react';
import Link from "next/link";
import useMediaType from "@/utils/hooks/useMediaType";

export interface BlogPostMetaData {
    title: string
    slug: string
    unix_timestamp: number
}

interface BlogPostsListProps {
    posts: BlogPostMetaData[];
}

export default function BlogPostsList({posts} : BlogPostsListProps) {
    const {is_desktop,is_tablet} = useMediaType()

    const list_div_class_name: string = React.useMemo(() => {
        let class_name = "flex flex-col gap-8"
        if (is_desktop) {
            class_name += " w-4/6 items-center mr-16 pt-8"
        } else if (is_tablet) {
            class_name += " w-4/6 items-center pt-24"
        } else {
            class_name += " w-full items-start pt-26 px-4"
        }
        return class_name
    }, [is_desktop,is_tablet]);
    
    return (
        <div
            style={{
                overflowY: "auto",
                height: "95vh"
            }}
            className={list_div_class_name}>
            {posts.map(({slug, title, unix_timestamp}) => (
                <Link
                    key={slug}
                    style={{
                        width: '100%',
                        height: "2rem"
                    }}
                    href={`/blog/${slug}`}
                    className={"hover:underline hover:text-red-300"}>
                    <div className="flex flex-col justify-between align-center w-full">
                        <p className={"text-lg"}> {title} </p>
                        <p className="text-gray-500 text-xs"> {
                            new Date(unix_timestamp).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                            })
                        } </p>
                    </div>
                </Link>
            ))}
        </div>
    )
 }
