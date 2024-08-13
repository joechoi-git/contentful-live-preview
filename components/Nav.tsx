"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import LanguageSwitcher from "../components/LanguageSwitcher";
import ThemeSwitcher from "../components/ThemeSwitcher";
// import { useI18n } from "../locales/client";

export default function Nav() {
    const params = useParams();
    // const i18n = useI18n();

    return (
        <nav className="flex items-center justify-between border-b-2 border-secondary pb-4 mb-6">
            <ul className="flex gap-4 text-accent">
                {!params.slug ? (
                    <li className="border-b-4 border-primary font-bold">
                        <Link href="/">Home</Link>
                    </li>
                ) : (
                    <>
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <li className="border-b-4 border-primary font-bold">
                            <Link href={params.slug.toString()}>Article</Link>
                        </li>
                    </>
                )}
            </ul>
            <div className="flex gap-4">
                <LanguageSwitcher />
                <ThemeSwitcher />
            </div>
        </nav>
    );
}
