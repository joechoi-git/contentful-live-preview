import React from "react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="mt-6 w-full text-center border-t-2 border-secondary py-6">
            <p>This is a sample app built to demonstrate the Contentful Live Preview feature.</p>
            <p>
                <Link
                    href="https://github.com/joechoi-git/contentful-live-preview"
                    target="_blank"
                    className="text-primary"
                >
                    Open GitHub repository.
                </Link>
            </p>
            <p className="pt-6">&copy; {new Date().getFullYear()}</p>
        </footer>
    );
}
