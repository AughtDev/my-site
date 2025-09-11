"use client"
import React from 'react';
import {ProjectMetaData} from "@/components/home/Projects";
import useMediaType from "@/utils/hooks/useMediaType";
import Link from "next/link";
import Image from "next/image";
import useTheme from "@/components/theme/useTheme";

interface ProjectCardProps {
    project: ProjectMetaData
}

export default function ProjectCard({project}: ProjectCardProps) {
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

    return (
        <Link
            href={`/projects/${project.slug}`}
            // className={"hover:underline hover:text-red-300"}
        >
            <div
                ref={div_ref}
                className={`project-pane ${is_hovered ? "project-pane-hovered" : ""} flex flex-col items-start rounded-xl p-4 w-full`}>
                <div
                    className={"relative w-full overflow-hidden rounded-2xl mb-2"}>
                    <div
                        style={{
                            backgroundColor: theme === "dark" ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.3)",
                        }}
                        className={`absolute z-999 rounded-xl py-1 px-3 m-2 ${is_hovered ? "backdrop-blur-lg" : "backdrop-blur-sm"}`}>
                        <p className={"text-sm hover:color-red-400"}>{project.title}</p>
                    </div>
                    {project.img_src ? (
                        <>
                            <img
                                src={project.img_src}
                                alt={project.title}
                                style={{
                                    // if is hovered, image is grayscale(0), else grayscale(1)
                                    filter: is_hovered ? 'grayscale(0%)' : 'grayscale(100%)',
                                }}
                                className={`w-full h-auto transition-all duration-300 ease-in-out ${is_hovered ? 'scale-105 shadow-lg' : 'scale-100'} aspect-square object-cover`}/>
                        </>
                    ) : (
                        <div
                            className={"bg-gray-200 dark:bg-gray-700 rounded-xl mb-4 w-full h-48 flex items-center justify-center"}>
                            <p className={"text-gray-500"}>No Image</p>
                        </div>
                    )}
                    <div
                        style={{
                            opacity: is_hovered ? 0 : 0.4,
                        }}
                        className="absolute inset-0 bg-red-300 mix-blend-multiply transition-opacity duration-300"/>
                </div>
                <p className={"text-sm"}>{project.description}</p>
                <div className={"flex flex-row items-center justify-end w-full"}>
                    <p className="text-gray-500 text-sm"> {
                        new Date(project.unix_timestamp).toLocaleDateString('en-US', {
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
