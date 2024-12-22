// ==============================
// DropdownMenu Component Tests
// ==============================

/**
 * Tests for DropdownMenu component.
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

// Application-specific imports
import DropdownMenu from "../../../src/components/Drop-Down-Menu/DropdownMenu";
import MediaFrontEndService from "../../../src/services/storefront/mediaFrontEndService";
import { BrowserRouter } from 'react-router-dom';

// ==============================
// MOCK DATA SETUP
// ==============================
const mockMediaData = {
    message: "Records retrieved successfully",
    data: [
        {
            Title: "The Hobbit",
            Type: "Book",
        },
        {
            Title: "The Great Gatsby",
            Type: "Book",
        }
    ],
    status: 200
};
const mockAutoComplete = jest.fn().mockResolvedValue(mockMediaData)
const mockEmptyMediaData = {
    message: "Records retrieved successfully",
    data: [],
    status: 200
};
const mockEmptyAutoComplete = jest.fn().mockResolvedValue(mockEmptyMediaData)

// ==============================
// MOCKING DEPENDENCIES
// ==============================
jest.mock("../../../src/services/storefront/mediaFrontEndService");
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    Link: jest.fn(({ to, state, children, ...props }) => (
        <a href={to} data-state={JSON.stringify(state)} {...props}>
            {children}
        </a>
    )),
}));

// ==============================
// UNIT TESTS
// ==============================
const testPrefix = 'DDM';
let testCounter = 1;
const testCase = () => {
    const num = String(testCounter).padStart(3, '0');
    testCounter++;
    return `UT-${testPrefix}-${num}: `; 
};

describe(testPrefix+": DropdownMenu Component Tests", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    // TEST CASE
    // ==============================
    it(testCase()+"Should not autoComplete under 3 chars", async () => {
        const mockGet = jest.fn();
        MediaFrontEndService.mockImplementation(() => {
            return {
                autoComplete: mockGet
            };
        });
        render(
            <BrowserRouter>
                <DropdownMenu searchText={""} setSearchText={jest.fn()} />
            </BrowserRouter>
        );
        const input = screen.getByTestId('search');

        // ACTIONS
        fireEvent.change(input, { target: { value: "mo" } });

        // RESULTS
        await waitFor(() => {
            expect(mockGet).not.toHaveBeenCalled();
        });
    });

    // TEST CASE
    // ==============================
    it(testCase()+"Should autoComplete over 3 chars", async () => {
        const mockGet = jest.fn().mockResolvedValue(mockMediaData);
        MediaFrontEndService.mockImplementation(() => {
            return {
                autoComplete: mockGet
            };
        });
        render(
            <BrowserRouter>
                <DropdownMenu searchText={""} setSearchText={jest.fn()} />
            </BrowserRouter>
        );
        const input = screen.getByTestId('search');

        // ACTIONS
        fireEvent.change(input, { target: { value: "the" } });

        // RESULTS
        await waitFor(() => {
            expect(mockGet).toHaveBeenCalled();
        });
    });

    // TEST CASE
    // ==============================
    it(testCase()+"Should display dropdown if media is present", async () => {
        MediaFrontEndService.mockImplementation(() => {
            return {
                autoComplete: mockAutoComplete
            };
        });
        render(
            <BrowserRouter>
                <DropdownMenu searchText={""} setSearchText={jest.fn()} />
            </BrowserRouter>
        );
        const input = screen.getByTestId('search');

        // ACTIONS
        fireEvent.change(input, { target: { value: "mock" } });

        // RESULTS
        await waitFor(() => {
            const dropdown = screen.getByTestId("dropdown-menu");
            const items = screen.getAllByTestId("dropdown-item");

            expect(dropdown).toBeInTheDocument();
            expect(items).toHaveLength(2);
            expect(items[0]).toHaveTextContent(mockMediaData.data[0].Title);
            expect(items[0]).toHaveTextContent(mockMediaData.data[0].Type);
            expect(items[1]).toHaveTextContent(mockMediaData.data[1].Title);
            expect(items[1]).toHaveTextContent(mockMediaData.data[1].Type);
        });
    });

    // TEST CASE
    // ==============================
    it(testCase()+"Should not display dropdown if media empty", async () => {
        MediaFrontEndService.mockImplementation(() => {
            return {
                autoComplete: mockEmptyAutoComplete
            };
        });
        render(
            <BrowserRouter>
                <DropdownMenu searchText={""} setSearchText={jest.fn()} />
            </BrowserRouter>
        );
        const input = screen.getByTestId('search');

        // ACTIONS
        fireEvent.change(input, { target: { value: "mock" } });

        // RESULTS
        await waitFor(() => {
            const dropdown = screen.queryByTestId("dropdown-menu");
            const items = screen.queryAllByTestId("dropdown-item");
            expect(dropdown).not.toBeInTheDocument();
            expect(items).toHaveLength(0);
        });
    });

    // TEST CASE
    // ==============================
    it(testCase()+"AutoComplete suggestion should pass correct state to the Media Page Link", async () => {
        MediaFrontEndService.mockImplementation(() => {
            return {
                autoComplete: mockAutoComplete
            };
        });
        render(
            <BrowserRouter initialEntries={['/']}>
                <DropdownMenu searchText={""} setSearchText={jest.fn()} />
            </BrowserRouter>

        );
        const input = screen.getByTestId('search');

        // ACTIONS
        fireEvent.change(input, { target: { value: "mock" } });

        // RESULTS
        const expectedState = {
            mediaType: mockMediaData.data[0].Type,
            mediaTitle: mockMediaData.data[0].Title,
        };
        await waitFor(() => {
            const items = screen.getAllByTestId("dropdown-item");
            expect(items[0]).toHaveAttribute("href", "/media");
            expect(items[0]).toHaveAttribute("data-state", JSON.stringify(expectedState));
        });
    });

});