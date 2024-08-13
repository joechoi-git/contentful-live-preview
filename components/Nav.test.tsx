/* eslint-disable indent */
import React from "react";
import { render } from "@testing-library/react";
import Nav from "./Nav";

// Mock the useI18n hook
jest.mock("../locales/client", () => ({
    useI18n: jest.fn()
}));

// Mock the useParams hook
jest.mock("next/navigation", () => ({
    useParams: jest.fn()
}));

describe("Nav", () => {
    it("renders correctly with home link active when no slug is present", () => {
        const mockI18n = jest.requireMock("../locales/client").useI18n;
        const mockUseParams = jest.requireMock("next/navigation").useParams;

        mockI18n.mockReturnValue((key: any) => {
            switch (key) {
                case "home":
                    return "Home";
                case "article":
                    return "Article";
                default:
                    return key;
            }
        });

        mockUseParams.mockReturnValue({ slug: null });

        const { getByText, asFragment } = render(<Nav />);

        expect(getByText("Home")).toBeInTheDocument();
        expect(getByText("Home").closest("li")).toHaveClass("border-primary font-bold");

        expect(asFragment()).toMatchSnapshot();
    });

    it("renders correctly with article link active when slug is present", () => {
        const mockI18n = jest.requireMock("../locales/client").useI18n;
        const mockUseParams = jest.requireMock("next/navigation").useParams;

        mockI18n.mockReturnValue((key: any) => {
            switch (key) {
                case "home":
                    return "Home";
                case "article":
                    return "Article";
                default:
                    return key;
            }
        });

        mockUseParams.mockReturnValue({ slug: "some-article" });

        const { getByText, asFragment } = render(<Nav />);

        expect(getByText("Home")).toBeInTheDocument();
        expect(getByText("Article")).toBeInTheDocument();
        expect(getByText("Article").closest("li")).toHaveClass("border-primary font-bold");

        expect(asFragment()).toMatchSnapshot();
    });
});
