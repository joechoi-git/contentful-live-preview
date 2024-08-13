"use client";

import React, { useEffect, useContext } from "react";
import { Inter } from "next/font/google";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { ThemeContext } from "../context/ThemeContext";
import { I18nProviderClient } from "../locales/client"; // "../../../locales/client";

const inter = Inter({ subsets: ["latin"] });

interface Props {
    children: React.ReactNode;
}

export default function Wrapper({ children }: Props): React.JSX.Element {
    const { theme } = useContext(ThemeContext);
    // const [language, setLanguage] = useState<string>("en");

    // to remove the flickering effect when loading a theme
    useEffect(() => {
        document.body.style.display = "block";
    }, [theme]);

    /*
    useEffect(() => {
        const savedLanguage = localStorage.getItem("language");
        if (savedLanguage) {
            setLanguage(savedLanguage);
        }
    }, []);
    */

    let savedLanguage = "en";
    if (localStorage && localStorage !== null && localStorage !== undefined) {
        savedLanguage = localStorage?.getItem("language") || "en";
    }

    return (
        <body
            data-theme={theme}
            style={{ display: "none" }}
            className={"min-h-screen overflow-x-hidden " + inter.className}
        >
            <I18nProviderClient locale={savedLanguage ? savedLanguage : "en"}>
                <main className="w-full mx-auto container max-w-[1200px] content-center p-6">
                    <Nav />
                    {children}
                    <Footer />
                </main>
            </I18nProviderClient>
        </body>
    );
}
