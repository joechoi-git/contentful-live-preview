import React, { useState, useEffect } from "react";

interface LanguageSwitcherProps {
    className?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className }) => {
    const [language, setLanguage] = useState<string>(
        process.env.NEXT_PUBLIC_CONTENTFUL_LOCALE || "en-US"
    );

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
    };

    return (
        <select
            value={language}
            onChange={handleLanguageChange}
            className={`rounded border-solid border-4 p-2 border-accent bg-primary text-primary-content ${className}`}
        >
            <option value="en-US">English</option>
            <option value="es-US">Spanish</option>
        </select>
    );
};

export default LanguageSwitcher;
