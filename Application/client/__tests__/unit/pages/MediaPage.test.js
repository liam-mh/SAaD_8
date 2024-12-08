// __tests__/MediaPage.test.jsx

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { SessionContext } from "../../../src/services/sessionContext";
import MediaPage from "../../../src/pages/media";
import MediaFrontEndService from "../../../src/services/storefront/mediaFrontEndService";
import WishlistFrontEndService from "../../../src/services/storefront/wishlistFrontEndSevice";

// Mocks for external dependencies
jest.mock("../../../src/services/storefront/mediaFrontEndService");
jest.mock("../../../src/services/storefront/wishlistFrontEndSevice");
jest.mock("../../../src/services/sessionContext");

describe("MediaPage Component", () => {
  const mockMedia = {
    Title: "Test Media",
    Type: "Movie",
    Genre: "Action",
    Author: "John Doe",
    PublishDate: "2022-01-01",
    Description: "A thrilling action movie.",
  };

  const mockWishlistService = {
    post: jest.fn(),
    get: jest.fn(),
  };

  const mockMediaService = {
    get: jest.fn().mockResolvedValue({
      data: [mockMedia],
    }),
    generateImageSrc: jest.fn().mockReturnValue("https://some-image-url.com"),
  };

  const mockSessionContextValue = {
    user: { MemberID: "123" },
  };

  // Mock all relevant components and services.
  jest.mock(
    "../../../src/components/Branch-Stock-Card/BranchStockCard",
    () => (props) =>
      (
        <div data-testid="branch-stock-card" onClick={props.onAddToBasket}>
          {props.media.Title} at {props.media.BranchID}
        </div>
      )
  );

  beforeEach(() => {
    // Clear any mocks before each test
    jest.clearAllMocks();

    // Mocking MediaFrontEndService and WishlistFrontEndService
    MediaFrontEndService.mockImplementation(() => mockMediaService);
    WishlistFrontEndService.mockImplementation(() => mockWishlistService);
  });

  it("renders media details correctly", async () => {
    render(
      <MemoryRouter initialEntries={["/media"]} initialIndex={0}>
        <SessionContext.Provider value={mockSessionContextValue}>
          <Routes>
            <Route path="/media" element={<MediaPage />} />
          </Routes>
        </SessionContext.Provider>
      </MemoryRouter>
    );

    // Check that media details are displayed
    expect(await screen.findByText("Test Media")).toBeInTheDocument();
    expect(screen.getByText("Type: Movie")).toBeInTheDocument();
    expect(screen.getByText("Genre: Action")).toBeInTheDocument();
    expect(screen.getByText("Author: John Doe")).toBeInTheDocument();
    expect(screen.getByText("Published: 2022-01-01")).toBeInTheDocument();
    expect(screen.getByText("A thrilling action movie.")).toBeInTheDocument();
  });

  it("displays an error message when no media is found", async () => {
    mockMediaService.get.mockResolvedValueOnce({ data: [] });

    render(
      <MemoryRouter initialEntries={["/media"]} initialIndex={0}>
        <SessionContext.Provider value={mockSessionContextValue}>
          <Routes>
            <Route path="/media" element={<MediaPage />} />
          </Routes>
        </SessionContext.Provider>
      </MemoryRouter>
    );

    // Check that the error message is displayed
    await waitFor(() =>
      expect(screen.getByText("No media available")).toBeInTheDocument()
    );
  });

  it("can add media to wishlist if the user is logged in", async () => {
    render(
      <MemoryRouter initialEntries={["/media"]} initialIndex={0}>
        <SessionContext.Provider value={mockSessionContextValue}>
          <Route path="/media">
            <MediaPage />
          </Route>
        </SessionContext.Provider>
      </MemoryRouter>
    );

    const wishlistButton = screen.getByTitle("Add to Wishlist");
    fireEvent.click(wishlistButton);

    await waitFor(() => expect(mockWishlistService.post).toHaveBeenCalled());
  });

  it('shows "Item in wishlist" if media is already in the wishlist', async () => {
    mockWishlistService.get.mockResolvedValueOnce({ data: [mockMedia] });

    render(
      <MemoryRouter initialEntries={["/media"]} initialIndex={0}>
        <SessionContext.Provider value={mockSessionContextValue}>
          <Routes>
            {" "}
            {/* Wrap <Route> inside <Routes> */}
            <Route path="/media" element={<MediaPage />} />
          </Routes>
        </SessionContext.Provider>
      </MemoryRouter>
    );

    // Check that "Item in wishlist" is shown
    await waitFor(() =>
      expect(screen.getByText("Item in wishlist")).toBeInTheDocument()
    );
  });

  it("shows a notification banner when adding to basket", async () => {
    render(
      <MemoryRouter initialEntries={["/media"]} initialIndex={0}>
        <SessionContext.Provider value={mockSessionContextValue}>
          <Routes>
            {" "}
            {/* Wrap <Route> inside <Routes> */}
            <Route path="/media" element={<MediaPage />} />
          </Routes>
        </SessionContext.Provider>
      </MemoryRouter>
    );

    const basketButton = screen.getByText("Add to Basket");
    fireEvent.click(basketButton);

    // Check that notification banner is shown
    await waitFor(() =>
      expect(screen.getByText("Test Media")).toBeInTheDocument()
    );
  });
});
