import {
    isoToFriendlyDate,
    isoToFriendlyDateTime,
    convertStringToFriendlyUri,
    transformBynderAsset,
    getCurrentTimestampWithoutSeconds
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
            const result = transformBynderAsset(mockBynderAsset);
            const expectedUrl = "https://bynder.com/transform-url/tag1-tag2?format=webp";
            const [urlWithoutDate, datePart] = result.split("&date=");
            expect(urlWithoutDate).toBe(expectedUrl);
            expect(datePart).toMatch(/\d{4}-\d{2}-\d{2}-\d{2}-\d{2}/);
        });

        it("should include custom options if provided", () => {
            const customOptions = "width=300&height=400";
            const result = transformBynderAsset(mockBynderAsset, customOptions);
            const expectedUrlPart = "https://bynder.com/transform-url/tag1-tag2?format=webp";
            const [urlWithoutDate, datePart] = result.split("&date=");
            expect(urlWithoutDate).toContain(expectedUrlPart);
            expect(result).toContain("width=300");
            expect(result).toContain("height=400");
            expect(datePart).toMatch(/\d{4}-\d{2}-\d{2}-\d{2}-\d{2}/);
        });

        it("should handle asset without tags correctly", () => {
            const assetWithoutTags = {
                ...mockBynderAsset,
                tags: []
            };
            const result = transformBynderAsset(assetWithoutTags);
            const expectedUrl = "https://bynder.com/transform-url/sample-asset?format=webp";
            const [urlWithoutDate, datePart] = result.split("&date=");
            expect(urlWithoutDate).toBe(expectedUrl);
            expect(datePart).toMatch(/\d{4}-\d{2}-\d{2}-\d{2}-\d{2}/);
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
            expect(timestamp).toBe("2024-07-25-13-45");
        });

        it("should correctly pad single digit month, day, hour, and minute with leading zeros", () => {
            mockDate("2024-01-05T08:09:00Z");
            const timestamp = getCurrentTimestampWithoutSeconds();
            expect(timestamp).toBe("2024-01-05-08-09");
        });
    });
});
