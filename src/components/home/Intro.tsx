"use client"
import React from 'react';
import useMediaType from "@/utils/hooks/useMediaType";

export default function Intro() {
    const {is_desktop,is_tablet} = useMediaType()

    const div_class_name = React.useMemo(() => {
        let name = "flex flex-col"
        if (is_desktop) {
            name += " items-start"
        } else {
            name += " items-center text-center"
        }
        return name
    }, [is_desktop]);
    const [pt, pb, pl,pr] = React.useMemo(() => {
        if (is_desktop) {
            return ["3rem", "3rem", "3rem","0rem"]
        } else {
            return ["7rem", "1rem", "2rem","2rem"]
        }
    }, [is_desktop]);

    // font sizes
    const [s1, s2, s3] = React.useMemo(() => {
        if (is_desktop) {
            return ["2.5rem", "2rem", "1.8rem"]
        } else if (is_tablet) {
            return ["2.2rem", "1.8rem", "1.5rem"]
        } else {
            return ["2.1rem", "1.7rem", "1.4rem"]
        }
    }, [is_desktop,is_tablet]);

    return (
        <div
            style={{
                paddingTop: pt,
                paddingBottom: pb,
                paddingLeft: pl,
                paddingRight: pr,
                // paddingLeft: "2rem",
            }}
            className={div_class_name}>
            <h1
                style={{
                    fontSize: s1,
                    fontWeight: "bold",
                }}
            >Hi,</h1>
            <h2
                style={{
                    fontSize: s2,
                }}
            >I&#39;m <span className={"text-red-400"}>Aught.</span></h2>
            <h2
                style={{
                    fontSize: s3,
                }}
            >A software developer, AI researcher, tinkerer.</h2>
        </div>
    )
}
