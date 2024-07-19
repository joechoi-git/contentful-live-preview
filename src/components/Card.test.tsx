import React from "react";
import { render, screen } from "@testing-library/react";
import Card from "../components/Card";
import type { RelatedBlog, BlogDetail } from "../lib/contentful/api";

jest.mock("next/link", () => {
    return ({ children }: { children: React.ReactNode }) => children;
});

jest.mock("next/image", () => {
    // eslint-disable-next-line react/display-name, @next/next/no-img-element
    return ({ alt, src }: { alt: string; src: string }) => <img alt={alt} src={src} />;
});

jest.mock("../lib/contentful/options", () => ({
    isoToFriendlyDate: jest.fn((date: string) => date),
    isoToFriendlyDateTime: jest.fn((datetime: string) => datetime)
}));

const mockBlog: RelatedBlog | BlogDetail = {
    slug: "test-slug",
    heroImage: { url: "/test-image.jpg" },
    sys: { id: "1", publishedAt: "2022-01-01T00:00:00Z", publishedVersion: 1 },
    title: "Test Title",
    categoryName: "Test Category",
    summary: "Test Summary",
    author: "Test Author",
    date: "2022-01-01"
};

describe("Card Component", () => {
    test("renders correctly with valid blog data", () => {
        render(<Card blog={mockBlog} />);

        expect(screen.getByRole("img")).toHaveAttribute("src", "/test-image.jpg");
        expect(screen.getByRole("img")).toHaveAttribute("alt", "placeholder");
        expect(screen.getByText("Test Title")).toBeInTheDocument();
        expect(screen.getByText("Test Category")).toBeInTheDocument();
        expect(screen.getByText("Test Summary")).toBeInTheDocument();
        expect(screen.getByText("Authored By: Test Author")).toBeInTheDocument();
        expect(screen.getByText("Authored On: 2022-01-01")).toBeInTheDocument();
        expect(screen.getByText("Published On: 2022-01-01T00:00:00Z")).toBeInTheDocument();
        expect(screen.getByText("Read More →")).toBeInTheDocument();
    });

    test("renders null when blog data is not provided", () => {
        const { container } = render(<Card blog={null as unknown as RelatedBlog | BlogDetail} />);
        expect(container).toBeEmptyDOMElement();
    });

    test("matches snapshot", () => {
        const { asFragment } = render(<Card blog={mockBlog} />);
        expect(asFragment()).toMatchSnapshot();
    });
});
