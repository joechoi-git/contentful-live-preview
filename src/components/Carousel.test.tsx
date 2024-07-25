import React from "react";
import { render, screen } from "@testing-library/react";
import Carousel from "./Carousel";
import type { BynderAsset } from "../lib/contentful/adjustedTypes";

const mockSlides: BynderAsset[] = [
    {
        archive: 0,
        brandId: "brand1",
        copyright: null,
        dateCreated: "2023-01-01",
        dateModified: "2023-01-02",
        datePublished: "2023-01-03",
        description: "Slide 1 description",
        extension: ["jpg"],
        fileSize: 12345,
        height: 400,
        id: "slide1",
        isPublic: 1,
        limited: 0,
        name: "Slide 1",
        orientation: "landscape",
        original: "https://example.com/slide1.jpg",
        thumbnails: {
            webimage: "https://example.com/slide1_webimage.jpg",
            thul: "https://example.com/slide1_thul.jpg",
            original: "https://example.com/slide1_original.jpg",
            mini: "https://example.com/slide1_mini.jpg",
            transformBaseUrl: "https://example.com/slide1_transform.jpg",
            Social: "https://example.com/slide1_social.jpg"
        },
        type: "image",
        watermarked: 0,
        width: 1200,
        videoPreviewURLs: [],
        tags: [],
        textMetaproperties: [],
        src: "https://example.com/slide1.jpg"
    },
    {
        archive: 0,
        brandId: "brand2",
        copyright: null,
        dateCreated: "2023-02-01",
        dateModified: "2023-02-02",
        datePublished: "2023-02-03",
        description: "Slide 2 description",
        extension: ["jpg"],
        fileSize: 12346,
        height: 400,
        id: "slide2",
        isPublic: 1,
        limited: 0,
        name: "Slide 2",
        orientation: "landscape",
        original: "https://example.com/slide2.jpg",
        thumbnails: {
            webimage: "https://example.com/slide2_webimage.jpg",
            thul: "https://example.com/slide2_thul.jpg",
            original: "https://example.com/slide2_original.jpg",
            mini: "https://example.com/slide2_mini.jpg",
            transformBaseUrl: "https://example.com/slide2_transform.jpg",
            Social: "https://example.com/slide2_social.jpg"
        },
        type: "image",
        watermarked: 0,
        width: 1200,
        videoPreviewURLs: [],
        tags: [],
        textMetaproperties: [],
        src: "https://example.com/slide2.jpg"
    }
];

describe("Carousel", () => {
    it("renders without crashing", () => {
        render(<Carousel slides={mockSlides} width={1200} height={400} />);
        expect(screen.getByAltText("Slide 1 description")).toBeInTheDocument();
        expect(screen.getByAltText("Slide 2 description")).toBeInTheDocument();
    });

    it("displays the correct number of slides", () => {
        render(<Carousel slides={mockSlides} width={1200} height={400} />);
        const slides = screen.getAllByRole("img");
        expect(slides).toHaveLength(2);
    });

    it("displays navigation buttons", () => {
        render(<Carousel slides={mockSlides} width={1200} height={400} />);
        const buttons = screen.getAllByRole("link");
        expect(buttons).toHaveLength(2);
        expect(buttons[0]).toHaveAttribute("href", "#carousel-0");
        expect(buttons[1]).toHaveAttribute("href", "#carousel-1");
    });

    it("matches snapshot", () => {
        const { asFragment } = render(<Carousel slides={mockSlides} width={1200} height={400} />);
        expect(asFragment()).toMatchSnapshot();
    });
});
