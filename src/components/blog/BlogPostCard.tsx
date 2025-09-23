import React from 'react';
import {BlogPostMetaData} from "@/components/blog/PostsList";
import useTheme from "@/components/theme/useTheme";
import Link from "next/link";

interface BlogPostCardProps {
    blogpost: BlogPostMetaData
}

export default function BlogPostCard({blogpost: {slug, description, title, unix_timestamp}}: BlogPostCardProps) {
    const {theme} = useTheme()

    const div_ref = React.useRef<HTMLDivElement | null>(null);
    const [is_hovered, setIsHovered] = React.useState<boolean>(false)

    React.useEffect(() => {
        const div = div_ref.current;
        if (!div) return;

        const handleMouseEnter = () => setIsHovered(true);
        const handleMouseLeave = () => setIsHovered(false);

        div.addEventListener('mouseenter', handleMouseEnter);
        div.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            div.removeEventListener('mouseenter', handleMouseEnter);
            div.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    const [outline_color, divider_color, text_color] = React.useMemo(() => {
        if (theme === "dark") {
            if (is_hovered) {
                return ['rgba(200, 100, 100, 0.3)', 'rgba(255, 220, 220, 0.3)', 'text-red-300'];
            } else {
                return ['rgba(200, 100, 100, 0.1)', 'rgba(255, 220, 220, 0.15)', ''];
            }
        } else if (theme === "light") {
            if (is_hovered) {
                return ['rgba(250, 150, 150, 0.8)', 'rgba(255, 140, 140, 0.4)', 'text-red-300'];
            } else {
                return ['rgba(250, 150, 150, 0.4)', 'rgba(255, 140, 140, 0.2)', ''];
            }
        } else {
            return ['rgba(250, 150, 150, 0.4)', 'rgba(1555, 40, 40, 0.3)', ''];
        }
    }, [is_hovered, theme]);

    React.useEffect(() => {
        console.log("the divider color is ", divider_color)
    }, [divider_color]);

    return (
        <Link
            className={"w-full px-1"}
            href={`/blog/${slug}`}>
            <div
                ref={div_ref}
                style={{
                    // outline: `1px solid ${outline_color}`,
                }}
                className={`project-pane ${is_hovered ? "project-pane-hovered" : ""} flex flex-col items-start rounded-sm p-3 w-full gap-2 transition-all duration-200 ease-in-out`}>
                <div
                    className={"flex flex-row w-full justify-between items-center"}>
                    <p className={`text-lg ${text_color}`}>{title}</p>
                </div>
                <hr
                    style={{
                        borderTop: `2px dashed ${divider_color}`,
                        width: '100%'
                    }}/>

                {description && (
                    <>
                        <div className={"w-full py-0.5"}>
                            <p className={"text-sm text-gray-500"}>{description}</p>
                        </div>
                        <hr
                            style={{
                                borderTop: `2px dashed ${divider_color}`,
                                width: '100%'
                            }}/>
                    </>
                )}
                <div className={"flex flex-row items-center justify-between w-full"}>
                    <div className={"flex flex-row items-center gap-2"}>
                    </div>
                    <p className={`${text_color ? text_color : "text-gray-500"} text-xs`}> {
                        new Date(unix_timestamp).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                        })
                    } </p>
                </div>
            </div>
        </Link>
    )
}
