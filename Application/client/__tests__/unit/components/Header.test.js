// ==============================
// Header Component Tests
// ==============================

/**
 * Tests for Header component.
 * Unit tests: 2
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
import Header from "../../../src/components/Header/Header";
import { SessionContext } from "../../../src/services/sessionContext";
import { BrowserRouter } from 'react-router-dom';
import BranchFrontEndService from "../../../src/services/storefront/branchFrontEndService";

// ==============================
// MOCK DATA SETUP
// ==============================
const mockSessionValue = {
    basket: [],
};

// ==============================
// MOCKING DEPENDENCIES
// ==============================
jest.mock("../../../src/services/storefront/branchFrontEndService");
BranchFrontEndService.mockImplementation(() => {
    return {
        get: jest.fn()
    };
});

jest.mock("../../../src/components/Drop-Down-Menu/DropdownMenu", () => ({
    __esModule: true,
    default: jest.fn(({ searchText, setSearchText }) => (
        <input
            data-testid="search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
        />
    )),
}));

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
const testPrefix = 'HDR';
let testCounter = 1;
const testCase = () => {
    const num = String(testCounter).padStart(3, '0');
    testCounter++;
    return `UT-${testPrefix}-${num}: `; 
};

describe(testPrefix+": Header Component Tests", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    // TEST CASE
    // ==============================
    it(testCase()+"Should display a search bar and button", async () => {
        render(
            <BrowserRouter>
                <SessionContext.Provider value={mockSessionValue}>
                    <Header />
                </SessionContext.Provider>
            </BrowserRouter>
        );
        const form = screen.getByTestId('search-form');
        const button = screen.getByTestId('search-button');

        // ACTIONS

        // RESULTS
        expect(form).toBeInTheDocument();
        expect(button).toBeInTheDocument();
    });

    // TEST CASE
    // ==============================
    it(testCase()+"Should pass the search term to the /search page", async () => {
        const searchText = 'mock search'
        render(
            <BrowserRouter>
                <SessionContext.Provider value={mockSessionValue}>
                    <Header />  
                </SessionContext.Provider>
            </BrowserRouter>
        );
        const searchInput = screen.getByTestId("search");
        const searchButton = screen.getByTestId('search-button');

        // ACTIONS
        fireEvent.change(searchInput, { target: { value: searchText } });
        fireEvent.click(searchButton);

        // RESULTS
        const searchLink = screen.getByTestId("search-link");
        expect(searchInput).toHaveValue(searchText);
        expect(searchLink).toHaveAttribute("href", "/search");
        expect(searchLink).toHaveAttribute("data-state", JSON.stringify({searchTerm: searchText}));
    });

});