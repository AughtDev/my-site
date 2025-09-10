"use client"
import React from 'react';
import path from "node:path";
import fs from "node:fs";
import {getProjectMetaData} from "@/utils/markdown";
import useMediaType from "@/utils/hooks/useMediaType";
import ProjectCard from "@/components/home/ProjectCard";

export interface ProjectMetaData {
    title: string
    slug: string
    unix_timestamp: number
    description: string
    github_link?: string
    img_src?: string
}

interface ProjectsProps {
    projects: ProjectMetaData[]
}

export default function Projects({projects}: ProjectsProps) {
    const {is_desktop, is_tablet} = useMediaType()

    const container_class_name = React.useMemo(() => {
        let class_name = "flex flex-col items-center py-4 mt-4"
        if (is_desktop) {
            class_name += " w-9/12"
        } else {
            class_name += " w-6/6"
        }
        return class_name
    }, [is_desktop]);
    const num_grid_cols = React.useMemo(() => {
        if (is_desktop) return 3;
        if (is_tablet) return 2;
        return 1;
    }, [is_desktop, is_tablet]);
    

    return (
        <div className={container_class_name}>
            <p className={"text-red-400 underline"} style={{fontSize: "2rem"}}>
                Projects
            </p>
            <div
                className={`grid gap-4 w-full mt-4`}
                style={{
                    gridTemplateColumns: `repeat(${num_grid_cols}, minmax(0, 1fr))`
                }}
            >
                {projects.map(project => (
                    <ProjectCard key={project.slug} project={project}/>
                ))}
            </div>
        </div>
    )
}
