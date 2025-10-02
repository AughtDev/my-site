import Intro from "@/components/home/Intro";
import Pfp from "@/components/home/Pfp";
import Projects, {ProjectMetaData} from "@/components/home/Projects";
import React from "react";
import path from "node:path";
import fs from "node:fs";
import {getProjectMetaData} from "@/utils/markdown";

export default function Home() {
    const projects: ProjectMetaData[] = React.useMemo(() => {
        const posts_dir = path.join(process.cwd(), 'content', 'projects');
        let filenames: string[] = [];

        try {
            filenames = fs.readdirSync(posts_dir);
        } catch {
            return []
        }

        return filenames.map((filename) => {
            const file_path = path.join(process.cwd(), 'content', 'projects', filename)
            return getProjectMetaData(file_path);
        }).filter(Boolean) as ProjectMetaData[];
    }, []);

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <div style={{
                height: "60vh"
            }} className="flex flex-row w-full justify-between">
                <div className="flex flex-row items-center justify-center"
                     style={{
                         // gap: "3rem",
                         width: '100%'
                     }}>
                    <Pfp/>
                    <Intro/>
                </div>
            </div>
            <Projects projects={projects}/>
        </div>
    );
}
