import React from "react";
import { render, screen } from "@testing-library/react";
import Nav from "../components/Nav";

jest.mock("next/navigation", () => ({
    useParams: jest.fn()
}));

// Mock the LanguageSwitcher component
// eslint-disable-next-line react/display-name
jest.mock("../components/LanguageSwitcher", () => () => (
    <div data-testid="mocked-language-switcher"></div>
));

jest.mock("next/link", () => {
    // eslint-disable-next-line react/display-name
    return ({ children, href }: { children: React.ReactNode; href: string }) => (
        <a href={href}>{children}</a>
    );
});

describe("Nav Component", () => {
    const useParamsMock = require("next/navigation").useParams;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders correctly when params.slug is not present", () => {
        useParamsMock.mockReturnValue({ slug: undefined });

        const { asFragment } = render(<Nav />);
        expect(screen.getByText("Home")).toHaveAttribute("href", "/");
        expect(screen.queryByText("Article")).not.toBeInTheDocument();
        expect(asFragment()).toMatchSnapshot();
    });

    test("renders correctly when params.slug is present", () => {
        useParamsMock.mockReturnValue({ slug: "test-article" });

        const { asFragment } = render(<Nav />);
        expect(screen.getByText("Home")).toHaveAttribute("href", "/");
        expect(screen.getByText("Article")).toHaveAttribute("href", "test-article");
        expect(asFragment()).toMatchSnapshot();
    });
});
