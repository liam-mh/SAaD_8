// ==============================
// Media Card Component Tests
// ==============================

/**
 * Tests for Media Card component.
 * Unit tests: 4
 * 
 * @author Liam Hammond
 */

// ==============================
// IMPORTS
// ==============================
import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";

// Application-specific imports
import MediaCard from "../../../src/components/Media-Card/MediaCard";
import MediaFrontEndService from "../../../src/services/storefront/mediaFrontEndService";
import { BrowserRouter } from 'react-router-dom';

// ==============================
// MOCK DATA SETUP
// ==============================
const mockMediaData = {
    Title: "The Hobbit",
    Type: "Book",
    Genre: "Fantasy",
    Author: "JRR Tolkien",
    PublishDate: "1937-09-21",
    Description: "A thrilling book about fairytale ceatures."
};
const mockInvalidMediaData = {
    Title: ""
};
const mockGenerateImageSrc = jest.fn().mockReturnValue("https://mocked-url.com/media-artwork.jpg");

// ==============================
// MOCKING DEPENDENCIES
// ==============================
jest.mock("../../../src/services/storefront/mediaFrontEndService");
MediaFrontEndService.mockImplementation(() => {
    return {
        get: jest.fn().mockResolvedValue(mockMediaData),
        generateImageSrc: mockGenerateImageSrc
    };
});

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    Link: jest.fn(({ to, state, children }) => (
        <a href={to} data-state={JSON.stringify(state)}>
            {children}
        </a>
    )),
}));

// ==============================
// UNIT TESTS
// ==============================
const testPrefix = 'MCC';
let testCounter = 1;
const testCase = () => {
    const num = String(testCounter).padStart(3, '0');
    testCounter++;
    return `UT-${testPrefix}-${num}: `; 
};

describe(testPrefix+": MediaCard Component Tests", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    // TEST CASE
    // ==============================
    it(testCase()+"Should call MediaFrontEndService.generateImageSrc with correct arguments", () => {
        render(
            <BrowserRouter>
                <MediaCard isSearchResult={true} media={mockMediaData} />
            </BrowserRouter>
        );

        // ACTIONS

        // RESULTS
        expect(mockGenerateImageSrc).toHaveBeenCalledTimes(1);
        expect(mockGenerateImageSrc).toHaveBeenCalledWith(mockMediaData.Title, mockMediaData.Type);
    });

    // TEST CASE
    // ==============================
    it(testCase()+"Should render with mocked image URL", () => {
        render(
            <BrowserRouter>
                <MediaCard isSearchResult={true} media={mockMediaData} />
            </BrowserRouter>
        );
        const cardImage = screen.getByRole("img", { name: mockMediaData.Title });

        // ACTIONS

        // RESULTS
        expect(cardImage).toHaveAttribute("src", "https://mocked-url.com/media-artwork.jpg");
        expect(cardImage).toHaveAttribute("alt", mockMediaData.Title);
    });

    // TEST CASE
    // ==============================
    it(testCase()+"Should render with title, type, image, and link", () => {
        render(
            <BrowserRouter>
                <MediaCard isSearchResult={true} media={mockMediaData} />
            </BrowserRouter>
        );
        const title = screen.getByText(mockMediaData.Title);
        const mediaType = screen.getByText(mockMediaData.Type);
        const cardImage = screen.getByRole("img");
        const button = screen.getByText("Shop");
    
        // ACTIONS

        // RESULTS
        expect(title).toBeInTheDocument();
        expect(mediaType).toBeInTheDocument();
        expect(cardImage).toBeInTheDocument();
        expect(button).toBeInTheDocument();
    });

    // TEST CASE
    // ==============================
    it(testCase()+"Should handle missing fields and null check", () => {
        render(
            <BrowserRouter>
                <MediaCard isSearchResult={true} media={mockInvalidMediaData} />
            </BrowserRouter>
        );
        const title = screen.getByText(mockMediaData.Title);
        const mediaType = screen.getByText(mockMediaData.Type);
    
        // ACTIONS

        // RESULTS
        expect(title).toBeTruthy();
        expect(mediaType).toBeTruthy(); 
        expect(title).not.toBeInTheDocument();
        expect(mediaType).not.toBeInTheDocument();
    });

    // TEST CASE
    // ==============================
    it(testCase()+"Should pass correct state to the Media Page Link", () => {
        render(
            <BrowserRouter initialEntries={['/search']}>
                <MediaCard isSearchResult={true} media={mockMediaData} />
            </BrowserRouter>
        );
        const shopButton = screen.getByRole('link', { name: /shop/i });
        const expectedState = {
            mediaType: mockMediaData.Type,
            mediaTitle: mockMediaData.Title,
        };

        // ACTIONS
        fireEvent.click(shopButton);

        // RESULTS
        expect(shopButton).toHaveAttribute("href", "/media");
        expect(shopButton).toHaveAttribute("data-state", JSON.stringify(expectedState));
    });

});