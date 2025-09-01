"use client"
import React from 'react';
import {GithubIcon, XIcon} from "@/assets/icons";

interface ContactLink {
    label: string;
    href: string;
    icon: React.ReactNode
}

const LINKS: ContactLink[] = [
    {
        label: "GitHub",
        href: "",
        icon: <GithubIcon/>,
    },
    {
        label: "X",
        href: "https://www.x.com/aughtdev",
        icon: <XIcon/>
    }
]

export default function ContactLinks() {

    return (
        <div className={"flex flex-col gap-12"}>
            {LINKS.map((link) => (
                <a key={link.label} href={link.href} target={"_blank"} rel={"noreferrer"}>
                    <div
                        className={"m-2 hover:opacity-70 transition-opacity cursor-pointer"}>
                        {link.icon}
                    </div>
                </a>
            ))}
        </div>
    )
}
