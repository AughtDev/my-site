"use client"
import React from 'react';
import {CustomIconProps, GithubIcon, XIcon} from "@/assets/icons";
import useMediaType from "@/utils/hooks/useMediaType";
import useTheme from "@/components/theme/useTheme";

interface ContactLink {
    label: string;
    href: string;
    icon: React.ComponentType<CustomIconProps>
}

const LINKS: ContactLink[] = [
    {
        label: "GitHub",
        href: "",
        icon: GithubIcon,
    },
    {
        label: "X",
        href: "https://www.x.com/aughtdev",
        icon: XIcon
    }
]

export default function ContactLinks() {
    const {theme} = useTheme()
    const {is_desktop,is_mobile,is_tablet} = useMediaType()

    const div_class_name = React.useMemo(() => {
        let class_name = "fixed flex items-center justify-center rounded-3xl backdrop-blur-md"
        if (is_desktop) {
            class_name += " mt-32 p-4 flex-col gap-12 right-0 top-0"
        } else {
            class_name += " flex-row gap-2 right-1 bottom-1 p-3"
        }
        return class_name
    }, [is_desktop]);

    const icon_size = React.useMemo(() => {
        if (is_mobile) return "24"
        if (is_tablet) return "28"
        return "32"
    }, [is_mobile,is_tablet]);

    return (
        <div
            style={{
                backgroundColor: theme === "dark" ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.6)",
            }}
            className={div_class_name}>
            {LINKS.map((link) => (
                <a key={link.label} href={link.href} target={"_blank"} rel={"noreferrer"}>
                    <div
                        className={"m-2 hover:opacity-70 transition-opacity cursor-pointer"}>
                        <link.icon size={icon_size}/>
                    </div>
                </a>
            ))}
        </div>
    )
}
