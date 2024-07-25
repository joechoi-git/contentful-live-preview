/* eslint-disable react/display-name */
import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "../components/Footer";

jest.mock("next/link", () => {
    return ({
        children,
        href,
        target,
        className
    }: {
        children: React.ReactNode;
        href: string;
        target?: string;
        className?: string;
    }) => (
        <a href={href} target={target} className={className}>
            {children}
        </a>
    );
});

describe("Footer Component", () => {
    test("renders correctly", () => {
        const { asFragment } = render(<Footer />);
        expect(
            screen.getByText(
                "This is a sample app designed to demonstrate the Contentful Live Preview SDK"
            )
        ).toBeInTheDocument();
        expect(screen.getByText("Open GitHub repository.")).toBeInTheDocument();
        expect(screen.getByText(`© ${new Date().getFullYear()}`)).toBeInTheDocument();
        expect(asFragment()).toMatchSnapshot();
    });

    test("has correct link attributes", () => {
        render(<Footer />);
        const linkElement = screen.getByText("Open GitHub repository.");
        expect(linkElement).toHaveAttribute(
            "href",
            "https://github.com/joechoi-git/contentful-live-preview"
        );
        expect(linkElement).toHaveAttribute("target", "_blank");
        expect(linkElement).toHaveClass("text-accent");
    });
});
