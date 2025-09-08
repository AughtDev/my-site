"use client"

import React from 'react';
import Link from "next/link";
import {usePathname} from "next/navigation";
import useTheme from "@/components/theme/useTheme";
import {MoonStar, Sun} from "lucide-react";
import ProfilePic from "@/components/home/ProfilePic";
import useMediaType from "@/utils/hooks/useMediaType";

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

function ThemeToggle() {
    const {theme, toggleTheme} = useTheme()
    return (
        <div
            style={{
                paddingTop: "0.1rem"
            }}
            className={"mr-12 ml-4 rounded-md cursor-pointer hover:opacity-70 transition-opacity translate-y-0.5"}
            onClick={toggleTheme}
        >
            {theme == "light" ?
                <MoonStar size={24}/> :
                <Sun size={24}/>
            }
        </div>
    )
}
export default function HeaderTab({tabs}: HeaderTabProps) {
    const curr_href = usePathname()
    const {is_desktop,is_mobile,is_tablet} = useMediaType()

    const div_class_name = React.useMemo(() => {
        let name = "fixed flex flex-row items-center w-full"
        
        if (is_desktop) {
            name += " justify-end space-x-8 py-4 m-4 px-4"
        } else {
            name += " justify-center space-x-4 py-4"
        }
        
        return name
    }, [is_desktop]);

    return (
        <div className={div_class_name} style={{zIndex: 999}}>
            <div className={"absolute left-0"}>
                {curr_href != "/" && (
                    <ProfilePic size={96}/>
                )}
            </div>

            <div className={"flex flex-row space-x-8"}>
                {tabs.map((tab) => (
                    <Link
                        key={tab.href}
                        style={{
                            fontSize: "1.3rem"
                        }}
                        className={(checkIfUrlMatchesOrIsParent(curr_href, tab.href) ? "text-red-200" : "") + " text-lg"}
                        href={tab.href}>
                        {tab.label.toUpperCase()}
                    </Link>
                ))}
            </div>
            <ThemeToggle/>
        </div>
    )
}
