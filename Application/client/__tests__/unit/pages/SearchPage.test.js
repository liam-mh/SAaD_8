// ==============================
// SearchPage Tests
// ==============================

/**
 * Tests for Search page.
 * Unit tests: 5
 * 
 * @author Liam Hammond
 */

// ==============================
// IMPORTS
// ==============================
import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route, useLocation } from "react-router-dom";

// Application-specific imports
import SearchPage from "../../../src/pages/search";
import MediaFrontEndService from "../../../src/services/storefront/mediaFrontEndService";

// ==============================
// MOCK DATA SETUP
// ==============================
const mockMediaData = {
    message: "Records retrieved successfully",
    data: [
        {
            Title: "The Hobbit",
            Type: "Book",
            Genre: "Fantasy",
            Author: "JRR Tolkien",
            PublishDate: "1937-09-21",
            Description: "A thrilling book about fairytale ceatures.",
        },
        {
            Title: "The Great Gatsby",
            Type: "Book",
            Genre: "Fiction",
            Author: "F. Scott Fitzgerald",
            PublishDate: "1925-04-10",
            Description: "A tale of love, wealth, and tragedy in 1920s America.",
        },
        {
            Title: "Abbey Road",
            Type: "CD",
            Genre: "Entertainment",
            Author: "The Beatles",
            PublishDate: "1969-09-26",
            Description: "A Beatles masterpiece with classic tracks.",
        }
    ],
    status: 200
};
const mockSearchTerm = 'The';
const mockGet = jest.fn().mockResolvedValue({ data: mockMediaData.data });
const mockAutoComplete = jest.fn().mockResolvedValue({ data: mockMediaData.data });

// ==============================
// MOCKING DEPENDENCIES
// ==============================
jest.mock("../../../src/services/scrollToSection");
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: jest.fn(),
}));

jest.mock("../../../src/services/storefront/mediaFrontEndService");
MediaFrontEndService.mockImplementation(() => {
    return {
        get: mockGet,
        autoComplete: mockAutoComplete,
        generateImageSrc: jest.fn().mockReturnValue("test")
    };
});

// ==============================
// UNIT TESTS
// ==============================
const testPrefix = 'SRP';
let testCounter = 1;
const testCase = () => {
    const num = String(testCounter).padStart(3, '0');
    testCounter++;
    return `UT-${testPrefix}-${num}: `; 
};

describe(testPrefix+": SearchPage Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        useLocation.mockReturnValue({ state: { searchTerm: mockSearchTerm } });
        Element.prototype.scrollIntoView = jest.fn();
    });

    // TEST CASE
    // ==============================
    it(testCase()+"Should make correct API call with searchTerm", async () => {
        render(
            <MemoryRouter initialEntries={[{ pathname: "/search" }]}>
                <Routes>
                    <Route path="/search" element={<SearchPage />} />
                </Routes>
            </MemoryRouter>
        );

        // ACTIONS

        // RESULTS
        await waitFor(() => {
            expect(mockAutoComplete).toHaveBeenCalled();
            expect(mockAutoComplete).toHaveBeenCalledWith(mockSearchTerm);
            expect(mockGet).not.toHaveBeenCalled(); 
        });
    });

    // TEST CASE
    // ==============================
    it(testCase()+"Should make correct API call for all results if no term", async () => {
        useLocation.mockReturnValue({ state: { searchTerm: '' } });
        render(
            <MemoryRouter initialEntries={[{ pathname: "/search" }]}>
                <Routes>
                    <Route path="/search" element={<SearchPage />} />
                </Routes>
            </MemoryRouter>
        );

        // ACTIONS

        // RESULTS
        await waitFor(() => {
            expect(mockGet).toHaveBeenCalled();
        });
    });

    // TEST CASE
    // ==============================
    it(testCase()+"Should pass the media array to MediaPagination", async () => {
        render(
            <MemoryRouter initialEntries={[{ pathname: "/search" }]}>
                <Routes>
                    <Route path="/search" element={<SearchPage />} />
                </Routes>
            </MemoryRouter>
        );
        const pagination = await waitFor(() => screen.getByTestId("media-pagination"));

        // ACTIONS

        // RESULTS
        expect(pagination).toBeInTheDocument();
    });

    // TEST CASE
    // ==============================
    it(testCase()+"Should display MediaCards in pagination", async () => {
        render(
            <MemoryRouter initialEntries={[{ pathname: "/search" }]}>
                <Routes>
                    <Route path="/search" element={<SearchPage />} />
                </Routes>
            </MemoryRouter>
        );

        // ACTIONS

        // RESULTS
        await waitFor(() => {
            const mediaItems = mockMediaData.data;
            expect(mediaItems.length).toBeGreaterThan(0);
            mediaItems.forEach((item) => {
                expect(screen.getByText(item.Title)).toBeInTheDocument();
            });
        });
    });

    // TEST CASE
    // ==============================
    it(testCase()+"Should update media depending on filter selected", async () => {
        render(
            <MemoryRouter initialEntries={[{ pathname: "/search" }]}>
                <Routes>
                    <Route path="/search" element={<SearchPage />} />
                </Routes>
            </MemoryRouter>
        );
        expect(await screen.findByText("The Hobbit")).toBeInTheDocument();
        expect(screen.getByText("The Great Gatsby")).toBeInTheDocument();
        expect(screen.getByText("Abbey Road")).toBeInTheDocument();

        // ACTIONS
        const bookCheckbox = screen.getByLabelText("Book");
        fireEvent.click(bookCheckbox);  

        // RESULTS
        expect(await screen.findByText("The Hobbit")).toBeInTheDocument();
        expect(screen.getByText("The Great Gatsby")).toBeInTheDocument();
        expect(screen.queryByText("Abbey Road")).not.toBeInTheDocument();
    });

    // TEST CASE
    // ==============================
    it(testCase()+"Should handle repeat input change for filters", async () => {
        render(
            <MemoryRouter initialEntries={[{ pathname: "/search" }]}>
                <Routes>
                    <Route path="/search" element={<SearchPage />} />
                </Routes>
            </MemoryRouter>
        );
        expect(await screen.findByText("The Hobbit")).toBeInTheDocument();
        expect(screen.getByText("The Great Gatsby")).toBeInTheDocument();
        expect(screen.getByText("Abbey Road")).toBeInTheDocument();

        // ACTIONS
        const bookCheckbox = screen.getByLabelText("Book");
        fireEvent.click(bookCheckbox);  
        fireEvent.click(bookCheckbox);  
        fireEvent.click(bookCheckbox);  

        // RESULTS
        expect(await screen.findByText("The Hobbit")).toBeInTheDocument();
        expect(screen.getByText("The Great Gatsby")).toBeInTheDocument();
        expect(screen.queryByText("Abbey Road")).not.toBeInTheDocument();
    });

    // TEST CASE
    // ==============================
    it(testCase()+"Should handle multiple filters selected and display corrcet media", async () => {
        render(
            <MemoryRouter initialEntries={[{ pathname: "/search" }]}>
                <Routes>
                    <Route path="/search" element={<SearchPage />} />
                </Routes>
            </MemoryRouter>
        );
        expect(await screen.findByText("The Hobbit")).toBeInTheDocument();
        expect(screen.getByText("The Great Gatsby")).toBeInTheDocument();
        expect(screen.getByText("Abbey Road")).toBeInTheDocument();

        // ACTIONS
        const bookCheckbox = screen.getByLabelText("Book");
        fireEvent.click(bookCheckbox);  
        const cdCheckbox = screen.getByLabelText("CD");
        fireEvent.click(cdCheckbox);   

        // RESULTS
        expect(await screen.findByText("The Hobbit")).toBeInTheDocument();
        expect(screen.getByText("The Great Gatsby")).toBeInTheDocument();
        expect(screen.queryByText("Abbey Road")).toBeInTheDocument();
    });

    // TEST CASE
    // ==============================
    it(testCase()+"Should handle 500 media call error response", async () => {
        const mockInvalidMediaData = {
            message: "Failed to retrieve records",
            data: [],
            status: 500
        };
        const mockGet = jest.fn().mockResolvedValue({ status: mockInvalidMediaData.status });
        useLocation.mockReturnValue({ state: { searchTerm: '' } });
        MediaFrontEndService.mockImplementation(() => {
            return {
                get: mockGet,
                autoComplete: mockAutoComplete,
                generateImageSrc: jest.fn().mockReturnValue("test")
            };
        });
        render(
            <MemoryRouter initialEntries={[{ pathname: "/search" }]}>
                <Routes>
                    <Route path="/search" element={<SearchPage />} />
                </Routes>
            </MemoryRouter>
        );
        
        // ACTIONS

        // RESULTS
        await waitFor(() => {
            expect(screen.getByText("No Results")).toBeInTheDocument();
        });
    });

    // TEST CASE
    // ==============================
    it(testCase()+"Should handle missing fields in media data", async () => {
        const mockInvalidMediaData = {
            message: "Records retrieved successfully",
            data: [
                {
                    Title: "The Hobbit",
                    Genre: "Fantasy",
                    Author: "JRR Tolkien",
                    PublishDate: "1937-09-21",
                    Description: "A thrilling book about fairytale ceatures.",
                },
                {
                    Title: "The Great Gatsby",
                    Genre: "Fiction",
                    Author: "F. Scott Fitzgerald",
                    PublishDate: "1925-04-10",
                    Description: "A tale of love, wealth, and tragedy in 1920s America.",
                },
                {
                    Type: "CD",
                    Genre: "Entertainment",
                    Author: "The Beatles",
                    PublishDate: "1969-09-26",
                    Description: "A Beatles masterpiece with classic tracks.",
                }
            ],
            status: 200
        };
        const mockGet = jest.fn().mockResolvedValue({ data: mockInvalidMediaData.data });
        useLocation.mockReturnValue({ state: { searchTerm: '' } });
        MediaFrontEndService.mockImplementation(() => {
            return {
                get: mockGet,
                autoComplete: mockAutoComplete,
                generateImageSrc: jest.fn().mockReturnValue("test")
            };
        });
        render(
            <MemoryRouter initialEntries={[{ pathname: "/search" }]}>
                <Routes>
                    <Route path="/search" element={<SearchPage />} />
                </Routes>
            </MemoryRouter>
        );

        // ACTIONS

        // RESULTS

        await waitFor(() => {
            expect(screen.getByText("The Hobbit")).not.toBeInTheDocument();
            expect(screen.getByText("The Great Gatsby")).not.toBeInTheDocument();
            expect(screen.getByText("Abbey Road")).not.toBeInTheDocument();
        });
    });

});