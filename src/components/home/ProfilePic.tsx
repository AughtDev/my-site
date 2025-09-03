"use client"
import React from 'react';
import useTheme from "@/components/theme/useTheme";
import Image from "next/image";

export default function ProfilePic({size = 220}: {size?: number}) {
    const {theme} = useTheme()

    return (
        <div
            style={{
                width: size,
                height: size,
            }}
            className="relative rounded-full overflow-hidden">
            <Image
                src="/profiles/light-pfp-sq.jpg"
                alt="Profile Image"
                width={size}
                height={size}
                className={`absolute top-0 left-0 transition-opacity duration-500 ${theme === 'light' ? 'opacity-100' : 'opacity-0'}`}
            />
            <Image
                src="/profiles/dark-pfp-sq.png"
                alt="Profile Image"
                width={size}
                height={size}
                className={`absolute top-0 left-0 transition-opacity duration-500 ${theme === 'dark' ? 'opacity-100' : 'opacity-0'}`}
            />
        </div>
    )
}
