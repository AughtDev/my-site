"use client"
import React from 'react';
import {ProjectMetaData} from "@/components/home/Projects";
import useMediaType from "@/utils/hooks/useMediaType";
import Link from "next/link";

interface ProjectCardProps {
    project: ProjectMetaData
}

export default function ProjectCard({project}: ProjectCardProps) {
    // const {is_desktop, is_tablet} = useMediaType();
    //
    // const card_class_name = React.useMemo(() => {
    //     let class_name = "project-pane flex flex-col items-start rounded-xl p-4 w-full"
    //
    // }, []);
    return (
        <div className={"project-pane flex flex-col items-start rounded-xl p-4 w-full"}>
            <Link
                href={`/projects/${project.slug}`}
                className={"hover:underline hover:text-red-300"}>
                <p className={"text-lg"}>{project.title}</p>
            </Link>
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
    )
}
