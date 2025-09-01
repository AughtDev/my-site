import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import React from "react";
import HeaderTab from "@/components/layout/HeaderTab";
import ThemeProvider from "@/components/theme/ThemeProvider";

import { Inter, Quicksand } from "next/font/google"

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "aughtdev",
    description: "aughtdev.me",
};

const quicksand = Quicksand({
    subsets: ['latin']
})

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ThemeProvider>
            <html lang="en">
            <body className={`m-4 ${quicksand.className}`}>
            <HeaderTab tabs={[
                {label: "Home", href: "/"},
                {label: "Blog", href: "/blog"},
                {label: "Projects", href: "/projects"},
            ]}/>
            {children}
            </body>
            </html>
        </ThemeProvider>
    );
}
