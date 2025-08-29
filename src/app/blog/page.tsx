import React from 'react';
import Link from "next/link";

export default function Blog() {

    return (
        <div className="flex flex-col align-center w-full">
            <div className="flex flex-row align-center justify-center w-full">
                <h1 className="text-3xl font-bold">
                    Blog Page
                </h1>
            </div>
            <div className={"flex flex-col align-center px-4 gap-8 mt-8"}>
                {[
                    {slug: 'first-post'},
                    {slug: 'second-post'},
                    {slug: 'third-post'},
                ].map(({slug}) => (
                    <div key={slug} className="flex flex-row justify-center w-full">
                        <Link href={`/blog/${slug}`} className={"hover:underline hover:text-red-300"}>
                            {slug.replace('-', ' ')}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}
