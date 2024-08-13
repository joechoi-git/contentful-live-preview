"use client";

import React, { useEffect, useContext } from "react";
import { Inter } from "next/font/google";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { ThemeContext } from "../context/ThemeContext";
// import { I18nProviderClient } from "../locales/client"; // "../../../locales/client";

/*

import { I18nProviderClient } from "../../../locales/client";

export default function SubLayout({
    params: { locale },
    children
}: {
    params: { locale: string };
    children: ReactElement;
}) {
    return <I18nProviderClient locale={locale}>{children}</I18nProviderClient>;
}


*/

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

    // allow switch

    return (
        <body
            data-theme={theme}
            style={{ display: "none" }}
            className={"min-h-screen overflow-x-hidden " + inter.className}
        >
            <main className="w-full mx-auto container max-w-[1200px] content-center p-6">
                <Nav />
                {children}
                <Footer />
            </main>
        </body>
    );
}
