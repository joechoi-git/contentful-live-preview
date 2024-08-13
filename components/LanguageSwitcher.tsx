import React, { useState, useEffect } from "react";
import { useChangeLocale, useCurrentLocale } from "../locales/client";

interface LanguageSwitcherProps {
    className?: string;
}

type Language = "en" | "es";

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className }) => {
    const [language, setLanguage] = useState<string>("en");

    let currentLocale = undefined;
    let changeLocale = undefined;
    try {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        currentLocale = useCurrentLocale();
        // eslint-disable-next-line react-hooks/rules-of-hooks
        changeLocale = useChangeLocale();
    } catch (error) {
        // console.log((error as Error)?.message);
    }

    useEffect(() => {
        const savedLanguage = localStorage.getItem("language");
        if (savedLanguage) {
            setLanguage(savedLanguage);
            if (savedLanguage !== currentLocale && changeLocale) {
                changeLocale(savedLanguage as Language);
            }
        }
    }, [changeLocale, currentLocale]);

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newLanguage = event.target.value;
        setLanguage(newLanguage);
        localStorage.setItem("language", newLanguage);
        if (changeLocale) {
            changeLocale(newLanguage as Language);
        }
    };

    return (
        <>
            <p>Locale: {currentLocale}</p>
            <p>Language: {language}</p>
            <select
                value={language}
                onChange={handleLanguageChange}
                className={`rounded border-solid border-4 p-2 border-accent bg-primary text-primary-content ${className}`}
            >
                <option value="en">English</option>
                <option value="es">Spanish</option>
            </select>
        </>
    );
};

export default LanguageSwitcher;
