"use client"
import React from 'react';
import ProfilePic from "@/components/globals/ProfilePic";
import useMediaType from "@/utils/hooks/useMediaType";

export default function Pfp() {
    const {is_desktop} = useMediaType()

    return (
        is_desktop ?
            <div className={"flex-shrink-0"}>
                <ProfilePic/>
            </div> : null
    )
}
