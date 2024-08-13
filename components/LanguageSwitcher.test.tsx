import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import LanguageSwitcher from "./LanguageSwitcher";

// Mock localStorage
const localStorageMock = (() => {
    let store: Record<string, string> = {};

    return {
        getItem(key: string) {
            return store[key] || null;
        },
        setItem(key: string, value: string) {
            store[key] = value;
        },
        clear() {
            store = {};
        },
        removeItem(key: string) {
            delete store[key];
        }
    };
})();

Object.defineProperty(window, "localStorage", {
    value: localStorageMock
});

describe("LanguageSwitcher", () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test("loads language from local storage on mount", () => {
        localStorage.setItem("language", "es");
        render(<LanguageSwitcher />);
        expect(screen.getByDisplayValue("Spanish")).toBeInTheDocument();
    });

    test("changes language and stores it in local storage", () => {
        render(<LanguageSwitcher />);

        // Change to Spanish
        fireEvent.change(screen.getByRole("combobox"), { target: { value: "es" } });
        expect(screen.getByDisplayValue("Spanish")).toBeInTheDocument();
        expect(localStorage.getItem("language")).toBe("es");

        // Change back to English
        fireEvent.change(screen.getByRole("combobox"), { target: { value: "en" } });
        expect(screen.getByDisplayValue("English")).toBeInTheDocument();
        expect(localStorage.getItem("language")).toBe("en");
    });

    test("applies additional class names passed as props", () => {
        const { container } = render(<LanguageSwitcher className="extra-class" />);
        const selectElement = container.querySelector("select");
        expect(selectElement).toHaveClass("extra-class");
    });

    test("matches snapshot", () => {
        const { asFragment } = render(<LanguageSwitcher />);
        expect(asFragment()).toMatchSnapshot();
    });
});
