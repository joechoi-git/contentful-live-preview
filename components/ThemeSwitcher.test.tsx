import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ThemeSwitcher from "./ThemeSwitcher";
import { ThemeContext, Theme } from "../context/ThemeContext";

// Mock the ThemeContext
const mockSetTheme = jest.fn();

const renderWithContext = (theme: Theme) => {
    return render(
        <ThemeContext.Provider value={{ theme, setTheme: mockSetTheme }}>
            <ThemeSwitcher />
        </ThemeContext.Provider>
    );
};

describe("ThemeSwitcher", () => {
    beforeEach(() => {
        mockSetTheme.mockClear();
        localStorage.clear();
    });

    it("renders the theme switcher with the current theme selected", () => {
        renderWithContext("light");

        const select = screen.getByRole("combobox");
        expect(select).toBeInTheDocument();
        expect(select).toHaveValue("light");
    });

    it("changes the theme and updates localStorage when a new theme is selected", () => {
        renderWithContext("light");

        const select = screen.getByRole("combobox");
        fireEvent.change(select, { target: { value: "dark" } });

        expect(mockSetTheme).toHaveBeenCalledWith("dark");
        expect(localStorage.getItem("theme")).toBe("dark");
    });

    it("uses the saved theme from localStorage if available", () => {
        localStorage.setItem("theme", "dark");
        renderWithContext("light");

        const select = screen.getByRole("combobox");
        expect(select).toHaveValue("dark");
    });

    it("matches the snapshot", () => {
        const { asFragment } = renderWithContext("light");
        expect(asFragment()).toMatchSnapshot();
    });
});
