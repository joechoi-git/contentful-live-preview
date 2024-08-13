/* eslint-disable indent */
import React from "react";
import { render } from "@testing-library/react";
import Footer from "../components/Footer";

jest.mock("../locales/client", () => ({
    useI18n: jest.fn()
}));

describe("Footer", () => {
    it("renders correctly with i18n translations", () => {
        const mockI18n = jest.requireMock("../locales/client").useI18n;
        mockI18n.mockReturnValue((key: any) => {
            switch (key) {
                case "sampleApp":
                    return "Sample Application";
                case "openGitHub":
                    return "Open GitHub";
                default:
                    return key;
            }
        });

        const { getByText, asFragment } = render(<Footer />);

        expect(getByText("Sample Application")).toBeInTheDocument();
        expect(getByText("Open GitHub")).toBeInTheDocument();
        expect(getByText(`© ${new Date().getFullYear()}`)).toBeInTheDocument();

        expect(asFragment()).toMatchSnapshot();
    });
});
