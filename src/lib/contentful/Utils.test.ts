import {
    isoToFriendlyDate,
    isoToFriendlyDateTime,
    convertStringToFriendlyUri,
    transformBynderAsset
} from "./Utils";
import { BynderAsset } from "./adjustedTypes";

// Mock for BynderAsset type
const mockBynderAsset: BynderAsset = {
    archive: 0,
    brandId: "brand-id",
    copyright: null,
    dateCreated: "2023-07-23T00:00:00Z",
    dateModified: "2023-07-24T00:00:00Z",
    datePublished: "2023-07-25T00:00:00Z",
    description: null,
    extension: ["jpg"],
    fileSize: 1024,
    height: 800,
    id: "1",
    isPublic: 1,
    limited: 0,
    name: "Sample Asset",
    orientation: "landscape",
    original: "https://bynder.com/original-url",
    thumbnails: {
        webimage: "https://bynder.com/webimage-url",
        thul: "https://bynder.com/thul-url",
        original: "https://bynder.com/original-url",
        mini: "https://bynder.com/mini-url",
        transformBaseUrl: "https://bynder.com/transform-url/",
        Social: "https://bynder.com/social-url"
    },
    type: "image",
    watermarked: 0,
    width: 1200,
    videoPreviewURLs: [],
    tags: ["Tag1", "Tag2"],
    textMetaproperties: [],
    src: "https://bynder.com/src-url"
};

describe("Utils functions", () => {
    describe("isoToFriendlyDate", () => {
        it("should convert ISO date string to friendly date format", () => {
            const isoDateString = "2023-07-23T00:00:00Z";
            const result = isoToFriendlyDate(isoDateString);
            expect(result).toBe("July 23, 2023");
        });

        it("should throw an error for an invalid date", () => {
            expect(() => {
                isoToFriendlyDate("invalid-date");
            }).toThrow("Invalid date");
        });
    });

    describe("isoToFriendlyDateTime", () => {
        it("should convert ISO date string to friendly date-time format", () => {
            const isoDateString = "2023-07-23T15:45:30Z";
            const result = isoToFriendlyDateTime(isoDateString);
            expect(result).toBe("July 23, 2023, 03:45:30 PM UTC");
        });

        it("should throw an error for an invalid date", () => {
            expect(() => {
                isoToFriendlyDateTime("invalid-date");
            }).toThrow("Invalid date");
        });
    });

    describe("convertStringToFriendlyUri", () => {
        it("should convert string to friendly URI", () => {
            const input = "Hello World!";
            const result = convertStringToFriendlyUri(input);
            expect(result).toBe("hello-world");
        });

        it("should handle multiple special characters correctly", () => {
            const input = "Hello @ World # 2023!";
            const result = convertStringToFriendlyUri(input);
            expect(result).toBe("hello-world-2023");
        });

        it("should trim leading and trailing hyphens", () => {
            const input = "---Hello World---";
            const result = convertStringToFriendlyUri(input);
            expect(result).toBe("hello-world");
        });
    });

    describe("transformBynderAsset", () => {
        it("should transform BynderAsset to expected URL", () => {
            const result = transformBynderAsset(mockBynderAsset);
            const expectedUrl = "https://bynder.com/transform-url/tag1-tag2?format=webp&quality=10";
            expect(result).toBe(expectedUrl);
        });

        it("should include custom options if provided", () => {
            const customOptions = "width=300&height=400";
            const result = transformBynderAsset(mockBynderAsset, customOptions);
            const expectedUrl =
                "https://bynder.com/transform-url/tag1-tag2?format=webp&quality=10&width=300&height=400";
            expect(result).toBe(expectedUrl);
        });

        it("should handle asset without tags correctly", () => {
            const assetWithoutTags = {
                ...mockBynderAsset,
                tags: []
            };
            const result = transformBynderAsset(assetWithoutTags);
            const expectedUrl =
                "https://bynder.com/transform-url/sample-asset?format=webp&quality=10";
            expect(result).toBe(expectedUrl);
        });
    });
});
