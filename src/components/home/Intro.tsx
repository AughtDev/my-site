"use client"
import React from 'react';

export default function Intro() {
    
    return (
        <div
            style={{
                paddingTop: "3rem",
                // paddingLeft: "2rem",
            }}
            className={"flex flex-col mx-8 h-full"}>
            <h1
                style={{
                    fontSize: "2.5rem",
                    fontWeight: "bold",
                }}
            >Hi,</h1>
            <h2
                style={{
                    fontSize: "2rem",
                }}
            >I&#39;m <span className={"text-red-400"}>Aught.</span></h2>
            <h2
                style={{
                    fontSize: "1.8rem",
                }}
            >A software developer, AI researcher, tinkerer.</h2>
        </div>
    )
}
