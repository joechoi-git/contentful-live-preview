import React, { useContext } from "react";
import { render, screen, act } from "@testing-library/react";
import { ThemeContext, ThemeProvider } from "./ThemeContext";

describe("ThemeProvider", () => {
    beforeAll(() => {
        // Mock localStorage
        const localStorageMock = (() => {
            let store: Record<string, string> = {};
            return {
                getItem: (key: string) => store[key] || null,
                setItem: (key: string, value: string) => {
                    store[key] = value;
                },
                clear: () => {
                    store = {};
                },
                removeItem: (key: string) => {
                    delete store[key];
                }
            };
        })();
        Object.defineProperty(window, "localStorage", { value: localStorageMock });

        // Mock matchMedia
        Object.defineProperty(window, "matchMedia", {
            writable: true,
            value: jest.fn().mockImplementation((query) => {
                return {
                    matches: query === "(prefers-color-scheme: dark)",
                    media: query,
                    onchange: null,
                    addListener: jest.fn(), // Deprecated
                    removeListener: jest.fn(), // Deprecated
                    addEventListener: jest.fn(),
                    removeEventListener: jest.fn(),
                    dispatchEvent: jest.fn()
                };
            })
        });
    });

    beforeEach(() => {
        localStorage.clear();
        // Reset matchMedia to default state (no preference)
        Object.defineProperty(window, "matchMedia", {
            writable: true,
            value: jest.fn().mockImplementation((query) => {
                return {
                    matches: false,
                    media: query,
                    onchange: null,
                    addListener: jest.fn(), // Deprecated
                    removeListener: jest.fn(), // Deprecated
                    addEventListener: jest.fn(),
                    removeEventListener: jest.fn(),
                    dispatchEvent: jest.fn()
                };
            })
        });
    });

    it("provides default theme value", () => {
        const TestComponent = () => {
            const { theme } = useContext(ThemeContext);
            return <div>Current theme: {theme}</div>;
        };

        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        // Initially, the theme should be 'light'
        expect(screen.getByText("Current theme: light")).toBeInTheDocument();
    });

    it("updates theme based on localStorage", () => {
        localStorage.setItem("theme", "dark");

        const TestComponent = () => {
            const { theme } = useContext(ThemeContext);
            return <div>Current theme: {theme}</div>;
        };

        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        expect(screen.getByText("Current theme: dark")).toBeInTheDocument();
    });

    it("updates theme based on system preference", () => {
        Object.defineProperty(window, "matchMedia", {
            writable: true,
            value: jest.fn().mockImplementation((query) => {
                return {
                    matches: query === "(prefers-color-scheme: dark)",
                    media: query,
                    onchange: null,
                    addListener: jest.fn(), // Deprecated
                    removeListener: jest.fn(), // Deprecated
                    addEventListener: jest.fn(),
                    removeEventListener: jest.fn(),
                    dispatchEvent: jest.fn()
                };
            })
        });

        const TestComponent = () => {
            const { theme } = useContext(ThemeContext);
            return <div>Current theme: {theme}</div>;
        };

        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        expect(screen.getByText("Current theme: dark")).toBeInTheDocument();
    });

    it("allows theme to be set through context", () => {
        const TestComponent = () => {
            const { theme, setTheme } = useContext(ThemeContext);
            return (
                <div>
                    <div>Current theme: {theme}</div>
                    <button onClick={() => setTheme("light")}>Set Light Theme</button>
                </div>
            );
        };

        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        act(() => {
            screen.getByText("Set Light Theme").click();
        });

        expect(screen.getByText("Current theme: light")).toBeInTheDocument();
    });
});
