

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route, resolvePath } from "react-router-dom";
import { SessionContext } from "../../../src/services/sessionContext";
import MediaPage from "../../../src/pages/media";
import MediaFrontEndService from "../../../src/services/storefront/mediaFrontEndService";
import WishlistFrontEndService from "../../../src/services/storefront/wishlistFrontEndSevice";
import "@testing-library/jest-dom";

/**
 * Unit tests for Media page.
 * @author Guy Nicklin
 */

// Mocks for external dependencies
jest.mock("../../../src/services/storefront/mediaFrontEndService");
jest.mock("../../../src/services/storefront/wishlistFrontEndSevice");
jest.mock("../../../src/services/sessionContext");


describe("MediaPage Component", () => {
  const mockMediaData = {
    data: [
      {
        Title: "The Hobbit",
        Type: "Book",
        Genre: "Fantasy",
        Author: "JRR Tolkien",
        PublishDate: "1937-09-21",
        Description: "A thrilling book about fairytale ceatures.",
      },
    ],
  };

  const mockWishlistData = {
    data: [
      {
        WishlistID: 1,
        MemberID: 1,
        Title: "The Hobbit",
        Type: "Book",
        DateTime: "2024-12-06",
        WishType: "Wishlist",
      },
    ],
  };

  jest.mock(
    "../../../src/components/Branch-Stock-Card/BranchStockCard",
    () => (props) =>
      (
        <div data-testid="branch-stock-card" onClick={props.onAddToBasket}>
          {props.media.Title} at {props.media.BranchID}
        </div>
      )
  );

  const mockSetMedia = jest.fn();

  const mockBasket = [{ Title: "The Hobbit", Type: "Book", BranchID: 1 }];

  const mockSetUsedWishlistButton = jest.fn();
  const mockSessionContextValue = {
    media: mockMediaData,
    user: { MemberID: "123" },
    basket: mockBasket,
    usedWishlistButton: false,
    setMedia: jest.fn(),
    setBasket: jest.fn(),
    setUsedWishlistButton: mockSetUsedWishlistButton,
  };

  WishlistFrontEndService.mockImplementation(() => {
    return {
      post: jest.fn(),
      get: jest.fn().mockResolvedValue(mockWishlistData),
    };
  });

  MediaFrontEndService.mockImplementation(() => {
    return {
      get: jest.fn().mockResolvedValue(mockMediaData),
      generateImageSrc: jest.fn().mockReturnValue("test"),
    };
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {});

  it("renders media details correctly", async () => {
    MediaFrontEndService.mockImplementation(() => {
      return {
        get: jest.fn().mockResolvedValue(mockMediaData),
        generateImageSrc: jest.fn().mockReturnValue("test"),
      };
    });

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
    await waitFor(() => {
      expect(screen.getByText("The Hobbit")).toBeInTheDocument();
      expect(screen.getByText(/Genre:\s*Fantasy/i)).toBeInTheDocument();
      expect(screen.getByText(/Author:\s*JRR Tolkien/i)).toBeInTheDocument();
      expect(screen.getByText(/Published:\s*1937-09-21/i)).toBeInTheDocument();
      expect(screen.getByAltText("The Hobbit")).toHaveAttribute("src", "test");
    });
  });

  it("displays an error message when no media is found", async () => {
    MediaFrontEndService.mockImplementation(() => {
      return {
        get: jest.fn().mockResolvedValue({ data: [] }),
        generateImageSrc: jest.fn().mockReturnValue("test"),
      };
    });

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
    const mockWishlistPost = jest.fn().mockResolvedValue(mockWishlistData);
    WishlistFrontEndService.mockImplementation(() => {
      return {
        post: mockWishlistPost,
        get: jest.fn().mockResolvedValue(mockWishlistData),
      };
    });

    render(
      <MemoryRouter initialEntries={["/media"]} initialIndex={0}>
        <SessionContext.Provider value={mockSessionContextValue}>
          <Routes>
            <Route path="/media" element={<MediaPage />} />
          </Routes>
        </SessionContext.Provider>
      </MemoryRouter>
    );

    const wishlistButton = screen.getByTitle("Add to Wishlist");
    fireEvent.click(wishlistButton);

    await waitFor(() => expect(mockWishlistPost).toHaveBeenCalled());
  });

  it("cannot add media if media is already a wishlist item", async () => {
    const mockWishlistPost = jest.fn().mockResolvedValue(mockWishlistData);
    WishlistFrontEndService.mockImplementation(() => {
      return {
        post: mockWishlistPost,
        get: jest.fn().mockResolvedValue(mockWishlistData),
      };
    });

    const { container } = render(
      <MemoryRouter initialEntries={["/media"]}>
        <SessionContext.Provider value={mockSessionContextValue}>
          <Routes>
            <Route path="/media" element={<MediaPage />} />
          </Routes>
        </SessionContext.Provider>
      </MemoryRouter>
    );

    const starIcon = container.querySelector(".bi.bi-star-fill");
    expect(starIcon).toBeInTheDocument();
  });

  it("cannot add media if the user is not logged in", async () => {
    const mockWishlistPost = jest.fn().mockResolvedValue(mockWishlistData);
    WishlistFrontEndService.mockImplementation(() => {
      return {
        post: mockWishlistPost,
        get: jest.fn().mockResolvedValue(mockWishlistData),
      };
    });

    // Ive simulate a user not being logged in, but created a copy so as not to mutate the original.
    const mockSessionContextValueWithoutUser = {
      ...mockSessionContextValue,
      user: null, 
    };

    const { container } = render(
      <MemoryRouter initialEntries={["/media"]}>
        <SessionContext.Provider value={mockSessionContextValueWithoutUser}>
          <Routes>
            <Route path="/media" element={<MediaPage />} />
          </Routes>
        </SessionContext.Provider>
      </MemoryRouter>
    );

    const wishlistButton = screen.queryByTitle("Add to Wishlist");
    expect(wishlistButton).not.toBeInTheDocument();

    // Login prompt is over two lines so have to match the link.
    const loginLink = screen.getByRole("link", { name: /login/i });
    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute("href", "/account#account");
  });
});
