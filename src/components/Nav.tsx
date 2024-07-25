"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import ThemeSwitcher from "../components/ThemeSwitcher";

export default function Nav() {
    const params = useParams();

    return (
        <nav className="w-full text-left border-b border-slate-300 pb-4 mb-6">
            <ul className="inline-flex gap-8 list-disc justify-start">
                <li className="font-bold list-none">Navigation</li>
                {!params.slug ? (
                    <li className="w-full text-left">
                        <Link href="/">Home</Link>
                    </li>
                ) : (
                    <>
                        <li className="w-full text-left">
                            <Link href="/">Home</Link>
                        </li>
                        <li className="w-full text-left">
                            <Link href={params.slug.toString()}>Article</Link>
                        </li>
                    </>
                )}
            </ul>
            <ThemeSwitcher />
        </nav>
    );
}
