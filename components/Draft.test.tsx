import { render } from "@testing-library/react";
import Draft from "./Draft";

// Mock the next/headers module
jest.mock("next/headers", () => ({
    draftMode: jest.fn()
}));

// Mock the getI18n function
jest.mock("../locales/server", () => ({
    getI18n: jest.fn()
}));

describe("Draft component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders draft mode enabled", async () => {
        const { draftMode } = require("next/headers");
        const { getI18n } = require("../locales/server");

        // Mocking draftMode to return enabled status
        draftMode.mockReturnValue({ isEnabled: true });

        // Define the translation keys and values
        const translations: Record<string, string> = {
            controlPanel: "Control Panel",
            draftEnabled: "Draft mode is enabled.",
            disableDraftMode: "Disable draft mode"
        };

        // Mocking getI18n to return a function that returns the expected strings
        getI18n.mockResolvedValue((key: string) => translations[key]);

        const { asFragment } = render(await Draft());

        // Snapshot test
        expect(asFragment()).toMatchSnapshot();
    });

    test("renders draft mode disabled", async () => {
        const { draftMode } = require("next/headers");
        const { getI18n } = require("../locales/server");

        // Mocking draftMode to return disabled status
        draftMode.mockReturnValue({ isEnabled: false });

        // Define the translation keys and values
        const translations: Record<string, string> = {
            controlPanel: "Control Panel",
            draftDisabled: "Draft mode is disabled.",
            enableDraftMode: "Enable draft mode"
        };

        // Mocking getI18n to return a function that returns the expected strings
        getI18n.mockResolvedValue((key: string) => translations[key]);

        const { asFragment } = render(await Draft());

        // Snapshot test
        expect(asFragment()).toMatchSnapshot();
    });
});
