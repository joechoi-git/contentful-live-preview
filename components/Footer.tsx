"use client";

import React from "react";
import Link from "next/link";
import { useI18n } from "../locales/client";

export default function Footer() {
    const i18n = useI18n();
    return (
        <footer className="mt-6 w-full text-center border-t-2 border-secondary py-6">
            <p>{i18n("sampleApp")}</p>
            <p>
                <Link
                    href="https://github.com/joechoi-git/contentful-live-preview"
                    target="_blank"
                    className="text-accent"
                >
                    {i18n("openGitHub")}
                </Link>
            </p>
            <p className="pt-6">&copy; {new Date().getFullYear()}</p>
        </footer>
    );
}
