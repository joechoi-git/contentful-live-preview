import React, { useState, useEffect } from "react";
import { useChangeLocale, useCurrentLocale } from "../../locales/client";

interface LanguageSwitcherProps {
    className?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className }) => {
    const [language, setLanguage] = useState<string>(
        process.env.NEXT_PUBLIC_CONTENTFUL_LOCALE || "en-US"
    );

    let currentLocale = "en";
    let changeLocale = undefined;
    try {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        currentLocale = useCurrentLocale();
        // eslint-disable-next-line react-hooks/rules-of-hooks
        changeLocale = useChangeLocale();
    } catch (error) {
        console.log((error as Error).message);
    }

    useEffect(() => {
        const savedLanguage = localStorage.getItem("language");
        if (savedLanguage) {
            setLanguage(savedLanguage);
        }
    }, []);

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newLanguage = event.target.value;
        setLanguage(newLanguage);
        localStorage.setItem("language", newLanguage);
        if (changeLocale) {
            if (newLanguage === "en-US") {
                changeLocale("en");
            } else {
                changeLocale("es");
            }
        }
    };

    return (
        <>
            <p>Locale: {currentLocale}</p>
            <select
                value={language}
                onChange={handleLanguageChange}
                className={`rounded border-solid border-4 p-2 border-accent bg-primary text-primary-content ${className}`}
            >
                <option value="en-US">English</option>
                <option value="es-US">Spanish</option>
            </select>
        </>
    );
};

export default LanguageSwitcher;
