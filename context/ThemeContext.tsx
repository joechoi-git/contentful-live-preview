"use client";

import React from "react";

type Props = {
    children?: React.ReactNode;
};

type Theme =
    | "system"
    | "light"
    | "dark"
    | "cupcake"
    | "bumblebee"
    | "emerald"
    | "corporate"
    | "synthwave"
    | "retro"
    | "cyberpunk"
    | "valentine"
    | "halloween"
    | "garden"
    | "forest"
    | "aqua"
    | "lofi"
    | "pastel"
    | "fantasy"
    | "wireframe"
    | "black"
    | "luxury"
    | "dracula"
    | "cmyk"
    | "autumn"
    | "business"
    | "acid"
    | "lemonade"
    | "night"
    | "coffee"
    | "winter"
    | "dim"
    | "nord"
    | "sunset";

type IAuthContext = {
    theme: Theme;
    // eslint-disable-next-line no-unused-vars
    setTheme: (arg: Theme) => void;
};

const ThemeContext = React.createContext<IAuthContext>({
    theme: "system",
    setTheme: () => {}
});

const ThemeProvider = ({ children }: Props) => {
    // initialize context with cookie values
    const [theme, setTheme] = React.useState<Theme>("system");

    React.useEffect(() => {
        let savedTheme: Theme = localStorage.getItem("theme") as Theme;
        if (!savedTheme || savedTheme === "system") {
            if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
                savedTheme = "dark";
            } else {
                savedTheme = "light";
            }
        }
        setTheme(savedTheme);
    }, []);

    return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

export { ThemeContext, ThemeProvider };
export type { Theme };
