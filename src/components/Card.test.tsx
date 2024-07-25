import React from "react";
import { render } from "@testing-library/react";
import Card from "./Card";
import type { BlogDetailProps } from "../lib/contentful/adjustedTypes";

// Mock the next/image component with explicit prop types
jest.mock("next/image", () => ({
    __esModule: true,
    // eslint-disable-next-line @next/next/no-img-element
    default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />
}));

const mockBlog: BlogDetailProps = {
    sys: {
        id: "1",
        type: "Entry",
        createdAt: "2023-01-01T00:00:00Z",
        updatedAt: "2023-01-01T00:00:00Z",
        locale: "en-US",
        contentType: {
            sys: {
                id: "blogPost",
                linkType: "ContentType",
                type: "Link"
            }
        },
        publishedAt: "2023-01-01T00:00:00Z",
        publishedVersion: 1
    },
    slug: "test-blog",
    title: "Test Blog Title",
    summary: "Test Blog Summary",
    author: "John Doe",
    carousel: [],
    heroImage: {
        url: "https://example.com/image.jpg"
    },
    categoryName: "Test Category",
    date: "2023-01-01T00:00:00Z",
    details: {
        json: {}
    },
    relatedBlogs: undefined,
    metadata: {
        tags: []
    },
    fields: {}
};

describe("Card Component", () => {
    it("renders correctly with given blog props", () => {
        const { getByAltText, getByText, asFragment } = render(<Card blog={mockBlog} />);

        // Check if the image is rendered with correct src
        const image = getByAltText("placeholder");
        expect(image).toHaveAttribute("src", "https://example.com/image.jpg");

        // Check if the title is rendered correctly
        expect(getByText("Test Blog Title")).toBeInTheDocument();

        // Check if the category name is rendered correctly
        expect(getByText("Test Category")).toBeInTheDocument();

        // Check if the summary is rendered correctly
        expect(getByText("Test Blog Summary")).toBeInTheDocument();

        // Check if the author name is rendered correctly
        expect(getByText("Authored By: John Doe")).toBeInTheDocument();

        // Check if the date is rendered correctly
        expect(getByText(/Authored On: /)).toBeInTheDocument();

        // Check if the published date is rendered correctly
        expect(getByText(/Published On:/)).toBeInTheDocument();

        // Snapshot test
        expect(asFragment()).toMatchSnapshot();
    });

    it("renders default image if heroImage.url is not provided", () => {
        const mockBlogWithoutImage = {
            ...mockBlog,
            heroImage: { url: "/default.jpeg" }
        };
        const { getByAltText, asFragment } = render(<Card blog={mockBlogWithoutImage} />);

        // Check if the default image is rendered
        const image = getByAltText("placeholder");
        expect(image).toHaveAttribute("src", "/default.jpeg");

        // Snapshot test
        expect(asFragment()).toMatchSnapshot();
    });

    it("renders null if blog slug is not provided", () => {
        const mockBlogWithoutSlug = { ...mockBlog, slug: "" };
        const { container, asFragment } = render(<Card blog={mockBlogWithoutSlug} />);

        // Check if the component renders null
        expect(container.firstChild).toBeNull();

        // Snapshot test
        expect(asFragment()).toMatchSnapshot();
    });
});
