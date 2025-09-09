"use client"

import React from 'react';
import Link from "next/link";
import {usePathname} from "next/navigation";
import useTheme from "@/components/theme/useTheme";
import {MoonStar, Sun} from "lucide-react";
import ProfilePic from "@/components/globals/ProfilePic";
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
            className={" rounded-md cursor-pointer hover:opacity-70 transition-opacity translate-y-0.5"}
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
    const {theme} = useTheme()
    const {is_desktop, is_tablet} = useMediaType()

    const div_class_name = React.useMemo(() => {
        let name = "fixed flex flex-row items-start w-full"

        if (is_desktop) {
            name += " justify-between space-x-8 py-2 m-4 px-4"
        } else {
            name += " justify-between space-x-4 py-2"
        }

        return name
    }, [is_desktop]);

    const pfp_size = React.useMemo(() => {
        if (is_desktop) return 96
        else if (is_tablet) return 72
        else return 64
    }, [is_desktop, is_tablet]);

    return (
        <div
            className={div_class_name}
            style={{
                zIndex: 999,
        }}
        >
            <div className={"p-1"}>
                {(curr_href != "/" || !is_desktop) && (
                    <ProfilePic size={pfp_size}/>
                )}
            </div>

            <div
                style={{
                    backgroundColor: theme === "dark" ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.6)",
                }}
                className={`flex flex-row items-center space-x-8 py-3 px-5 ${is_desktop ? "mr-5" : "mr-4"} rounded-3xl backdrop-blur-md`}>
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
        </div>
    )
}
