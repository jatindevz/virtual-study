import React from "react";

import Navbar from "@/components/Navbar";


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <Navbar />
            <div className="min-h-screen bg-[#0F0F15] pt-14 px-4 sm:px-6 lg:px-8 ">
            {children}

            </div>

        </div>


    );
}
