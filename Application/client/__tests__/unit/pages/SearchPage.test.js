// ==============================
// SearchPage Tests
// ==============================

/**
 * Tests for Search page.
 * Unit tests: 
 * 
 * @author Liam Hammond
 */

// ==============================
// IMPORTS
// ==============================
import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

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

// ==============================
// MOCKING DEPENDENCIES
// ==============================
jest.mock("../../../src/services/storefront/mediaFrontEndService");
MediaFrontEndService.mockImplementation(() => {
    return {
        get: jest.fn().mockResolvedValue({ data: mockMediaData.data }),
        autoComplete: jest.fn().mockResolvedValue({ data: mockMediaData.data })
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
    afterEach(() => {
        jest.clearAllMocks();
    });

    // TEST CASE
    // ==============================
    it(testCase()+"Should make correct API call with searchTerm", async () => {
        render(
            <MemoryRouter initialEntries={[{ pathname: "/search", state: { searchTerm: mockSearchTerm } }]}>
                <Routes>
                    <Route path="/search" element={<SearchPage />} />
                </Routes>
            </MemoryRouter>
        );

        // ACTIONS

        // RESULTS
        await waitFor(() => {
            expect(MediaFrontEndService.mock.instances[0].autoComplete).toHaveBeenCalled();
            expect(MediaFrontEndService.mock.instances[0].autoComplete).toHaveBeenCalledWith(mockSearchTerm);
        });
    });

    // TEST CASE
    // ==============================
    it(testCase()+"Should pass the media array to MediaPagination", async () => {
        render(
            <MemoryRouter initialEntries={[{ pathname: "/search", state: { searchTerm: mockSearchTerm } }]}>
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
            <MemoryRouter initialEntries={[{ pathname: "/search", state: { searchTerm: mockSearchTerm } }]}>
                <Routes>
                    <Route path="/search" element={<SearchPage />} />
                </Routes>
            </MemoryRouter>
        );

        // ACTIONS

        // RESULTS
        const mediaItems = mockMediaData.data;
        expect(mediaItems.length).toBeGreaterThan(0);
        mediaItems.forEach((item) => {
            expect(screen.getByText(item.Title)).toBeInTheDocument();
        });
    });

    // TEST CASE
    // ==============================
    it(testCase()+"Should update media depending on filter selected", async () => {
        render(
            <MemoryRouter initialEntries={[{ pathname: "/search", state: { searchTerm: mockSearchTerm } }]}>
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

});