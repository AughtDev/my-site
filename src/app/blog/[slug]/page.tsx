import React from "react";

import path from "node:path";
import * as fs from "node:fs";
import matter from 'gray-matter'

import {remark} from 'remark'
import remarkRehype from "remark-rehype";
import {slugToTitle} from "@/utils/strings";
import rehypeStringify from "rehype-stringify";
import rehypeShiki from "@shikijs/rehype";
import rehypePrettyCode from "rehype-pretty-code";


interface BlogPostProps {
    params: {
        slug: string
    }
}


export async function generateStaticParams() {
    const posts_dir = path.join(process.cwd(), 'content', 'blog');
    const filenames = fs.readdirSync(posts_dir);

    return filenames.map((filename) => {
        return {
            slug: filename.replace(/\.md$/, '')
        }
    })
}

export default async function BlogPost({params}: BlogPostProps) {
    const {slug} = await params

    const file_path = path.join(process.cwd(), 'content', 'blog', `${slug}.md`)

    const file_content = fs.readFileSync(file_path, 'utf8')

    const matter_result = matter(file_content)

    const processed_content = await remark()
        .use(remarkRehype, {allowDangerousHtml: true})
        .use(rehypePrettyCode, {
            theme: {
                light: "rose-pine-dawn",
                dark: "night-owl"
            },
        })
        .use(rehypeStringify)
        .process(matter_result.content)

    const content_html = processed_content.toString()

    return (
        <div className={"flex flex-col w-full items-center"}>
            <article className={"markdown w-5/6"}>
                {/*<h1 className={"title"}>{slugToTitle(slug)}</h1>*/}
                <div dangerouslySetInnerHTML={{__html: content_html}}/>
            </article>
        </div>
    )

}
