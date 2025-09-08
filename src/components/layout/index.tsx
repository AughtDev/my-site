"use client"
import React from 'react';
import useMediaType from "@/utils/hooks/useMediaType";
import HeaderTab from "@/components/layout/HeaderTab";
import ContactLinks from "@/components/layout/ContactLinks";

interface SiteLayoutProps {
    children: React.ReactNode
}

function SiteHeader() {
    return (
        <HeaderTab tabs={[
            {label: "Home", href: "/"},
            {label: "Blog", href: "/blog"},
            // {label: "Projects", href: "/projects"},
        ]}/>
    )
}

function MobileSiteLayout({children}: SiteLayoutProps) {
    return (
        <>
            <SiteHeader/>
            <div className="flex flex-row justify-between">
                <div style={{flexGrow: 1}}>
                    {children}
                </div>
            </div>
            <ContactLinks/>
        </>
    )
}

function DesktopSiteLayout({children}: SiteLayoutProps) {
    return (
        <>
            <SiteHeader/>
            <div className="flex flex-row justify-between ml-16 mr-4">
                <div style={{flexGrow: 1,paddingTop: "5rem"}}>
                    {children}
                </div>
            </div>
            <ContactLinks/>
        </>
    )
}


export default function SiteLayout(props: SiteLayoutProps) {
    const {is_mobile, is_tablet, is_desktop} = useMediaType()

    return (
        is_mobile && <MobileSiteLayout {...props}/> ||
        is_tablet && <MobileSiteLayout {...props}/> ||
        is_desktop && <DesktopSiteLayout {...props}/>
    )
}
