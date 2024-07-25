import React from "react";
import type { Metadata } from "next";
import Wrapper from "../components/Wrapper";
import Draft from "../components/Draft";
import { ThemeProvider } from "@/context/ThemeContext";
import "./globals.css";

export const metadata: Metadata = {
    title: "Contentful Live Preview",
    description: "This is a sample app designed to demonstrate the Contentful Live Preview SDK"
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <ThemeProvider>
                <Wrapper>
                    <Draft />
                    {children}
                </Wrapper>
            </ThemeProvider>
        </html>
    );
}
