interface BlogPostProps {
    params: {
        slug: string
    }
}


export async function generateStaticParams() {
    return [
        {slug: 'first-post'},
        {slug: 'second-post'},
        {slug: 'third-post'},
    ]
}

export default async function BlogPost({params}: BlogPostProps) {
    const {slug} = await params

    return (
        <article>
            <h1 className="text-3xl font-bold">
                Blog Post: {slug}
            </h1>
            <p className="mt-4">
                This is a blog post about {slug}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
        </article>
    )

}
