import type {Metadata} from "next";
import {Geist, Geist_Mono, Montserrat, Nunito, Open_Sans} from "next/font/google";
import "./globals.scss";
import React from "react";
import ThemeProvider from "@/components/theme/ThemeProvider";

import {Inter, Quicksand} from "next/font/google"
import SiteLayout from "@/components/layout";

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
const inter = Open_Sans({
    subsets: ['latin'],
})

export default function RootLayout
({children,}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" style={{
            overflowX: "hidden"
        }}>
        <body
            className={`relative ${inter.className} p-2`}
            style={{width: '100%'}}>
        <ThemeProvider>
            <SiteLayout>
                {children}
            </SiteLayout>
        </ThemeProvider>
        </body>
        </html>
    );
}
