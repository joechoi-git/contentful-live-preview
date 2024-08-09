import React from "react";
import { render, screen } from "@testing-library/react";
import Draft from "../components/Draft";

jest.mock("next/headers", () => ({
    draftMode: jest.fn()
}));

describe("Draft Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders correctly when draft mode is enabled", () => {
        const draftModeMock = require("next/headers").draftMode;
        draftModeMock.mockReturnValue({ isEnabled: true });

        const { asFragment } = render(<Draft />);
        expect(screen.getByText("Control Panel")).toBeInTheDocument();
        expect(screen.getByText("Draft Mode is")).toBeInTheDocument();
        expect(screen.getByText("Enabled.")).toBeInTheDocument();
        expect(screen.getByText("Disable Draft Mode")).toHaveAttribute(
            "href",
            "/api/disable-draft-mode"
        );

        expect(asFragment()).toMatchSnapshot();
    });

    test("renders correctly when draft mode is disabled", () => {
        const draftModeMock = require("next/headers").draftMode;
        draftModeMock.mockReturnValue({ isEnabled: false });

        const { asFragment } = render(<Draft />);
        expect(screen.getByText("Control Panel")).toBeInTheDocument();
        expect(screen.getByText("Draft Mode is")).toBeInTheDocument();
        expect(screen.getByText("Disabled.")).toBeInTheDocument();
        expect(screen.getByText("Enable Draft Mode")).toHaveAttribute(
            "href",
            "/api/enable-draft-mode"
        );

        expect(asFragment()).toMatchSnapshot();
    });
});
