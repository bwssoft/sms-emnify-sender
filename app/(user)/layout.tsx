'use client'

import type { Metadata } from "next";
import { Theme } from "@radix-ui/themes";
import { Inter } from "next/font/google";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

import "@radix-ui/themes/styles.css";
import "../globals.css";

import { SideBar } from "../ui/side-bar";
import { Navbar } from "../ui/nav-bar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    function openSidebar() {
        setSidebarOpen(true);
    }

    return (
        <html lang="en" className="h-full bg-white">
            <body className={`h-full ${inter.className}`}>
                <Theme className="h-full">
                    <Toaster position="top-center" />
                    <SideBar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                    <div className="h-full lg:pl-64">
                        <Navbar openSidebar={openSidebar} />
                        <div className="w-full max-h-[calc(100vh-120px)] sm:max-h-[calc(100vh-57px)] overflow-hidden h-full">
                            {children}
                        </div>
                    </div>
                </Theme>
            </body>
        </html>
    );
}
