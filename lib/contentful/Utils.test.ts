import {
    isoToFriendlyDate,
    isoToFriendlyDateTime,
    convertStringToFriendlyUri,
    transformBynderAsset,
    getCurrentTimestampWithoutSeconds,
    convertLocale
} from "./Utils";
import type { BynderAsset } from "./adjustedTypes";

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
            const result = transformBynderAsset({ slide: mockBynderAsset, isUnique: false });
            const expectedUrl =
                "https://bynder.com/transform-url/sample-asset-tag1-tag2?format=webp";
            expect(result).toBe(expectedUrl);
        });

        it("should include custom options if provided", () => {
            const customOptions = "width=300&height=400";
            const result = transformBynderAsset({
                slide: mockBynderAsset,
                options: customOptions,
                isUnique: false
            });
            const expectedUrlPart =
                "https://bynder.com/transform-url/sample-asset-tag1-tag2?format=webp&width=300&height=400";
            expect(result).toContain(expectedUrlPart);
            expect(result).toContain("width=300");
            expect(result).toContain("height=400");
        });

        it("should handle asset without tags correctly", () => {
            const assetWithoutTags = {
                ...mockBynderAsset,
                tags: []
            };
            const result = transformBynderAsset({ slide: assetWithoutTags, isUnique: false });
            const expectedUrl = "https://bynder.com/transform-url/sample-asset?format=webp";
            expect(result).toBe(expectedUrl);
        });

        it("should handle unique timestamp correctly", () => {
            const assetWithoutTags = {
                ...mockBynderAsset,
                tags: []
            };
            const result = transformBynderAsset({ slide: assetWithoutTags });
            const expectedUrl = "https://bynder.com/transform-url/sample-asset";
            expect(result).toContain(expectedUrl);
            expect(result).toMatch(/-\d{8}-\d{4}/);
        });
    });

    describe("getCurrentTimestampWithoutSeconds", () => {
        // Mock Date
        const realDate = Date;

        function mockDate(isoDate: string) {
            global.Date = class extends realDate {
                constructor() {
                    super();
                    return new realDate(isoDate);
                }
            } as unknown as typeof Date;
        }

        beforeAll(() => {
            mockDate("2024-07-25T13:45:00Z");
        });

        afterAll(() => {
            global.Date = realDate;
        });

        it("should return the current timestamp without seconds in the format YYYY-MM-DD-HH-MM", () => {
            const timestamp = getCurrentTimestampWithoutSeconds();
            expect(timestamp).toBe("20240725-1345");
        });

        it("should correctly pad single digit month, day, hour, and minute with leading zeros", () => {
            mockDate("2024-01-05T08:09:00Z");
            const timestamp = getCurrentTimestampWithoutSeconds();
            expect(timestamp).toBe("20240105-0809");
        });
    });

    describe("convertLocale", () => {
        test("returns en-US when locale is en", () => {
            expect(convertLocale("en")).toBe("en-US");
        });

        test("returns es-US when locale is not en", () => {
            expect(convertLocale("es")).toBe("es-US");
            expect(convertLocale("fr")).toBe("es-US");
            expect(convertLocale("de")).toBe("es-US");
            expect(convertLocale("")).toBe("es-US");
        });

        test("handles unexpected input gracefully", () => {
            expect(convertLocale("unknown")).toBe("es-US");
            expect(convertLocale("123")).toBe("es-US");
            expect(convertLocale(undefined as any)).toBe("es-US");
            expect(convertLocale(null as any)).toBe("es-US");
        });
    });
});
