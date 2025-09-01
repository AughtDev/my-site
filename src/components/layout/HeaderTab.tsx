"use client"

import React from 'react';
import Link from "next/link";
import {usePathname} from "next/navigation";
import useTheme from "@/components/theme/useTheme";
import {MoonStar, Sun} from "lucide-react";

export interface Tab {
    label: string;
    href: string;
}

interface HeaderTabProps {
    tabs: Tab[]
}

function checkIfUrlMatchesOrIsParent(curr_url: string, tab_url: string): boolean {
    if (curr_url === tab_url) {
        return true;
    }
    if (curr_url.startsWith(tab_url)) {
        // check that the next character is a slash and that there are no more slashes after that
        if (
            curr_url.charAt(tab_url.length) === '/' &&
            curr_url.indexOf('/', tab_url.length + 1) === -1
        ) {
            return true;
        }
    }
    return false;
}

export default function HeaderTab({tabs}: HeaderTabProps) {
    const curr_href = usePathname()
    const {theme, toggleTheme} = useTheme()

    return (
        <div className={"flex flex-row justify-end align-center space-x-8 py-4 m-4"}>
            <div className={"flex flex-row space-x-8"}>
                {tabs.map((tab) => (
                    <Link
                        key={tab.href}
                        className={(checkIfUrlMatchesOrIsParent(curr_href, tab.href) ? "text-red-200" : "") + " text-lg"}
                        href={tab.href}>
                        {tab.label.toUpperCase()}
                    </Link>
                ))}
            </div>

            <div
                className={"mr-4 ml-6 rounded-md cursor-pointer hover:opacity-70 transition-opacity translate-y-0.5"}
                onClick={toggleTheme}
            >
                {theme == "light" ?
                    <MoonStar size={24}/> :
                    <Sun size={24}/>
                }
            </div>
        </div>
    )
}
