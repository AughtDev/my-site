"use client"
import React from 'react';
import path from "node:path";
import fs from "node:fs";
import {getProjectMetaData} from "@/utils/markdown";
import useMediaType from "@/utils/hooks/useMediaType";
import ProjectCard from "@/components/home/ProjectCard";
import ProjectCardV2 from "@/components/home/ProjectCardV2";
import {useMediaQuery} from "react-responsive";

export interface ProjectMetaData {
    title: string
    slug: string
    unix_timestamp: number
    description: string
    github_link?: string
    site_link?: string
    img_src?: string
}

interface ProjectsProps {
    projects: ProjectMetaData[]
}

export default function Projects({projects}: ProjectsProps) {
    // const is_mobile = useMediaQuery({maxWidth: 564})
    const is_wide_screen = useMediaQuery({minWidth: 1200})
    const is_tablet = useMediaQuery({minWidth: 564, maxWidth: 1199})

    const container_class_name = React.useMemo(() => {
        let class_name = "flex flex-col items-center py-4 mt-4 px-4"
        if (is_wide_screen) {
            class_name += " w-9/12"
        } else {
            class_name += " w-6/6"
        }
        return class_name
    }, [is_wide_screen]);
    const num_grid_cols = React.useMemo(() => {
        if (is_wide_screen) return 3;
        if (is_tablet) return 2;
        return 1;
    }, [is_tablet, is_wide_screen]);
    

    return (
        <div className={container_class_name}>
            <p className={"text-red-400 underline mb-4"} style={{fontSize: "2rem"}}>
                Projects
            </p>
            <div
                className={`grid gap-8 w-full mt-4`}
                style={{
                    gridTemplateColumns: `repeat(${num_grid_cols}, minmax(0, 1fr))`
                }}
            >
                {projects.map(project => (
                    <ProjectCardV2 key={project.slug} project={project}/>
                ))}
            </div>
        </div>
    )
}
