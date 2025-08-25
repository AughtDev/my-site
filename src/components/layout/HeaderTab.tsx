"use client"

import React from 'react';
import Link from "next/link";
import {usePathname} from "next/navigation";

export interface Tab {
    label: string;
    href: string;
}

interface HeaderTabProps {
    tabs: Tab[]
}

export default function HeaderTab({tabs} : HeaderTabProps) {
    const curr_href = usePathname()

    return (
        <div className={"flex flex-row justify-center space-x-8 py-4"}>
            {tabs.map((tab) => (
                <Link
                    key={tab.href}
                    className={curr_href == tab.href ? "text-red-200" : ""}
                    href={tab.href}>
                    {tab.label}
                </Link>
            ))}
        </div>
    )
 }
