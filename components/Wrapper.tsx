"use client";

import React, { useEffect, useContext } from "react";
import { Inter } from "next/font/google";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { ThemeContext } from "../context/ThemeContext";
import { I18nProviderClient } from "../locales/client"; // "../../../locales/client";
import { DEFAULT_LANGUAGE } from "../lib/contentful/Constants";

const inter = Inter({ subsets: ["latin"] });

interface Props {
    children: React.ReactNode;
}

export default function Wrapper({ children }: Props): React.JSX.Element {
    const { theme } = useContext(ThemeContext);

    // to remove the flickering effect when loading a theme
    useEffect(() => {
        document.body.style.display = "block";
    }, [theme]);

    let savedLanguage = DEFAULT_LANGUAGE;
    try {
        if (localStorage && localStorage !== null && localStorage !== undefined) {
            savedLanguage = localStorage?.getItem("language") || DEFAULT_LANGUAGE;
        }
    } catch (error) {
        // console.log("error", error);
    }

    return (
        <body
            data-theme={theme}
            style={{ display: "none" }}
            className={"min-h-screen overflow-x-hidden " + inter.className}
        >
            <I18nProviderClient locale={savedLanguage}>
                <main className="w-full mx-auto container max-w-[1200px] content-center p-6">
                    <Nav />
                    {children}
                    <Footer />
                </main>
            </I18nProviderClient>
        </body>
    );
}
