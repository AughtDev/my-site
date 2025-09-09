"use client"
import React from 'react';
import useMediaType from "@/utils/hooks/useMediaType";

interface BlogPostContentProps {
    html_content: string;
}

export default function BlogPostContent({html_content} : BlogPostContentProps) {
    const {is_desktop,is_tablet} = useMediaType()

    const article_class_name = React.useMemo(() => {
        let class_name = "markdown pb-16"
        if (is_desktop) {
            class_name += " markdown-desktop w-5/6"
        } else if (is_tablet) {
            class_name += " markdown-tablet w-5/6 pt-20 px-2"
        } else {
            class_name += " markdown-mobile w-full pt-24 px-4"
        }
        return class_name
    }, [is_desktop, is_tablet]);
    
    return (
        <article style={{
            maxWidth: "97vw"
        }} className={article_class_name}>
            <div dangerouslySetInnerHTML={{__html: html_content}}/>
        </article>
    )
 }
