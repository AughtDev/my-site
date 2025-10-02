"use client"
import React from 'react';
import useMediaType from "@/utils/hooks/useMediaType";

interface BlogPostContentProps {
    html_content: string;
}

const IMAGE_GAP = 8; // gap in pixels between images in a row
export default function BlogPostContent({html_content}: BlogPostContentProps) {
    const article_ref = React.useRef<HTMLElement>(null);

    const {is_desktop, is_tablet} = useMediaType()
    const article_class_name = React.useMemo(() => {
        let class_name = "markdown pb-16"
        if (is_desktop) {
            class_name += " markdown-desktop w-4/6"
        } else if (is_tablet) {
            class_name += " markdown-tablet w-5/6 pt-20 px-2"
        } else {
            class_name += " markdown-mobile w-full pt-24 px-4"
        }
        return class_name
    }, [is_desktop, is_tablet]);

    React.useLayoutEffect(() => {
        const container = article_ref.current;
        if (!container) return;

        // Find all table rows where every cell contains a single image
        const rows = container.querySelectorAll('tr');
        rows.forEach(row => {
            const tds = Array.from(row.querySelectorAll('td,th'));
            if (
                tds.length > 0 &&
                tds.every(td => td.children.length === 1 && td.children[0].tagName === 'IMG')
            ) {
                // set the spacing between the tds
                (row as HTMLElement).style.gap = `${IMAGE_GAP}px`;
                (row as HTMLElement).style.justifyContent = "flex-start";
                (row as HTMLElement).style.display = "flex";

                // We have a row where every cell contains a single image
                const imgs = tds.map(td => td.children[0] as HTMLImageElement);
                // Wait for all images to load
                Promise.all(imgs.map(img => {
                    if (img.complete) return Promise.resolve();
                    return new Promise(res => img.onload = res);
                })).then(() => {
                    // Calculate aspect ratios
                    const aspectRatios = imgs.map(img => img.naturalWidth / img.naturalHeight);
                    const totalAspect = aspectRatios.reduce((a, b) => a + b, 0);
                    // Set height so that sum of widths at that height = row width
                    const rowWidth = ((row as HTMLElement).offsetWidth || container.offsetWidth) - (imgs.length - 1) * IMAGE_GAP;
                    const targetHeight = rowWidth / totalAspect;
                    imgs.forEach(img => {
                        img.style.height = `${targetHeight}px`;
                        img.style.width = 'auto';
                        img.style.maxWidth = '100%';
                        img.style.objectFit = 'contain';
                        img.style.display = 'block';
                    });
                });
            }
        });
    }, [html_content, is_desktop, is_tablet])

    return (
        <article ref={article_ref} style={{
            maxWidth: "97vw"
        }} className={article_class_name}>
            <div dangerouslySetInnerHTML={{__html: html_content}}/>
        </article>
    )
}
