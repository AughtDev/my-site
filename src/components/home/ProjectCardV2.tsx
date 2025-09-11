"use client"
import React from 'react';
import {ProjectMetaData} from "@/components/home/Projects";
import Link from "next/link";
import useTheme from "@/components/theme/useTheme";
import {Link2, LucideGithub} from "lucide-react";
import {CutoutGithubIcon, GithubIcon} from "@/assets/icons";

interface ProjectCardV2Props {
    project: ProjectMetaData
}

export default function ProjectCardV2({project}: ProjectCardV2Props) {
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
                return ['rgba(200, 100, 100, 0.5)', 'rgba(255, 100, 100, 0.2)', 'text-red-400'];
            } else {
                return ['rgba(200, 100, 100, 0.2)', 'rgba(255, 100, 100, 0.1)', ''];
            }
        } else {
            if (is_hovered) {
                return ['rgba(250, 150, 150, 0.8)', 'rgba(255, 100, 100, 0.2)', 'text-red-400'];
            } else {
                return ['rgba(250, 150, 150, 0.4)', 'rgba(255, 100, 100, 0.1)', ''];
            }
        }
    }, [is_hovered, theme]);

    return (
        <Link
            href={`/projects/${project.slug}`}>
            <div
                ref={div_ref}
                style={{
                    outline: `1px solid ${outline_color}`,
                }}
                className={`project-pane ${is_hovered ? "project-pane-hovered" : ""} flex flex-col items-start rounded-sm p-3 w-full gap-2 transition-all duration-200 ease-in-out`}>
                <div className={"flex flex-row w-full justify-between items-center"}>
                    <p className={`text-lg ${text_color}`}>{project.title}</p>
                    <div className={"flex flex-row items-center gap-2"}>
                        {project.github_link && <a href={project.github_link}>
                            <CutoutGithubIcon className={"hover:fill-red-400 transition-colors duration-200"} size={20}/>
                        </a>}
                        {project.site_link && <a href={project.site_link}>
                            <Link2 className={"hover:stroke-red-400"} size={20}/>
                        </a>}
                    </div>
                </div>
                <hr className={`border-t-2 border-dashed ${divider_color} opacity-20 w-full`}/>
                <div className={"w-full h-50"}>
                    <p className={"text-sm"}>{project.description}</p>
                </div>
                <hr className={`border-t-2 border-dashed ${divider_color} opacity-10 w-full`}/>
                <div className={"flex flex-row items-center justify-between w-full"}>
                    <div className={"flex flex-row items-center gap-2"}>
                    </div>
                    <p className="text-gray-500 text-xs"> {
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
