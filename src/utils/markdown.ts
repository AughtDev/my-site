import fs from "node:fs";
import matter from "gray-matter";
import {remark} from "remark";
import remarkRehype from "remark-rehype";
import rehypePrettyCode from "rehype-pretty-code";
import {transformerCopyButton} from "@rehype-pretty/transformers";
import rehypeCodeMeta from "@/lib/rehype-code-meta";
import rehypeStringify from "rehype-stringify";
import {ProjectMetaData} from "@/components/home/Projects";
import {slugToTitle} from "@/utils/strings";
import {BlogPostMetaData} from "@/components/blog/PostsList";
import path from "node:path";
import remarkGfm from "remark-gfm";

export async function convertMarkdownFileToHtml(file_path: string): Promise<string | undefined> {
    const file_content = fs.readFileSync(file_path, 'utf8')

    const matter_result = matter(file_content)

    const processed_content = await remark()
        .use(remarkRehype)
        .use(remarkGfm)
        .use(rehypePrettyCode, {
            theme: {
                light: "rose-pine-dawn",
                dark: "night-owl"
            },
            transformers: [
                transformerCopyButton(({
                    visibility: 'always',
                    feedbackDuration: 3_000
                }))
            ],
            onVisitTitle: (node) => {
                console.log("Visiting title:", node);
            }

        })
        .use(rehypeCodeMeta)
        .use(rehypeStringify)
        .process(matter_result.content)

    return processed_content.toString()
}


export function getProjectMetaData(file_path: string): ProjectMetaData | undefined {
    const file_content = fs.readFileSync(file_path, 'utf8')

    if (!file_content) return undefined

    const matter_result = matter(file_content)

    if (!matter_result) return undefined

    // const slug = file_path.split('/').pop()?.replace(/\.md$/, '') || ""
    const slug = path.basename(file_path, ".md")

    return {
        title: matter_result.data.title || slugToTitle(slug),
        description: matter_result.data.description || "...",
        github_link: matter_result.data.github_link || undefined,
        site_link: matter_result.data.site_link || undefined,
        blogpost_link: matter_result.data.site_link || undefined,
        img_src: matter_result.data.img_src || undefined,
        slug: slug,
        unix_timestamp: fs.statSync(file_path).birthtimeMs
    }
}


export function getBlogPostMetaData(file_path: string): BlogPostMetaData | undefined {

    const file_content = fs.readFileSync(file_path, 'utf8')

    if (!file_content) return undefined

    const matter_result = matter(file_content)

    if (!matter_result) return undefined

    // const slug = file_path.split('/').pop()?.replace(/\.md$/, '') || ""
    const slug = path.basename(file_path, ".md")

    console.log("slug is ", slug, "file_path is ", file_path)


    return {
        title: matter_result.data.title || slugToTitle(slug),
        slug: slug,
        description: matter_result.data.description,
        unix_timestamp: fs.statSync(file_path).birthtimeMs
    }
}
