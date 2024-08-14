import React from "react";
import { render, screen } from "@testing-library/react";
import Card from "./Card";
import { useI18n } from "../locales/client";
import { CardProps } from "../lib/contentful/adjustedTypes";

// Mock the `useI18n` hook
jest.mock("../locales/client", () => ({
    useI18n: jest.fn()
}));

describe("Card component", () => {
    const mockBlog: CardProps = {
        slug: "test-blog",
        title: "Test Blog Title",
        categoryName: "Category Name",
        summary: "This is a summary of the blog post.",
        author: "Author Name",
        date: new Date().toISOString(),
        heroImage: {
            url: "/image.jpg"
            // Add any other properties required by the Asset type
        },
        sys: {
            id: "unique-id",
            type: "Entry",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            locale: "en-US",
            contentType: {
                sys: {
                    id: "blogPost",
                    linkType: "ContentType",
                    type: "Link"
                }
            },
            publishedAt: "", // Use an empty string or another placeholder instead of null
            publishedVersion: 1
        },
        metadata: {
            tags: []
        }, // Add appropriate mock data here if needed
        fields: {} // Add appropriate mock data here if needed
    };

    beforeEach(() => {
        (useI18n as jest.Mock).mockReturnValue((key: string) => key);
    });

    test("renders the Card component with provided blog data", () => {
        render(<Card blog={mockBlog} />);

        // Check if the title is rendered
        expect(screen.getByText("Test Blog Title")).toBeInTheDocument();

        // Check if the category name is rendered
        expect(screen.getByText("Category Name")).toBeInTheDocument();

        // Check if the summary is rendered
        expect(screen.getByText("This is a summary of the blog post.")).toBeInTheDocument();

        // Check if the author is rendered
        expect(screen.getByText("authoredBy: Author Name")).toBeInTheDocument();

        // Check if the date is rendered
        expect(screen.getByText(/authoredOn:/)).toBeInTheDocument();

        // Check if the "read more" link is rendered
        expect(screen.getByText("readMore →")).toBeInTheDocument();
    });

    test("renders 'In Draft' if the published date is not provided", () => {
        const draftBlog = {
            ...mockBlog,
            sys: {
                ...mockBlog.sys,
                publishedAt: "" // Use an empty string instead of null
            }
        };
        render(<Card blog={draftBlog} />);

        expect(screen.getByText("publishedOn: In Draft")).toBeInTheDocument();
    });

    test("does not render the component if the blog has no slug", () => {
        const invalidBlog = { ...mockBlog, slug: "" };
        const { container } = render(<Card blog={invalidBlog} />);
        expect(container.firstChild).toBeNull();
    });

    test("matches snapshot", () => {
        const { asFragment } = render(<Card blog={mockBlog} />);
        expect(asFragment()).toMatchSnapshot();
    });
});
