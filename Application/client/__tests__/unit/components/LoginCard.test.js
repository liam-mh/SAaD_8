import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginCard from "../../../src/components/Login-Card/LoginCard";
import { SessionContext } from "../../../src/services/sessionContext";
import { BrowserRouter } from "react-router-dom";
import MemberFrontEndService from "../../../src/services/account/memberFrontEndService";
import { useLocation } from "react-router-dom";
import EmployeeFrontEndService from "../../../src/services/account/employeeFrontEndService";

/**
 * Tests for Login card comoponent.
 * 
 * @author Guy Nicklin
 */

jest.mock("../../../src/services/account/memberFrontEndService");
jest.mock("../../../src/services/account/employeeFrontEndService")

const mockUserData = {
  message: "Records retrieved successfully",
  data: [
    {
      MemberID: 89,
      FirstName: "Guy",
      Surname: "Nicklin",
      Email: "test@yahoo.com",
      FirstLineAddress: "71 Lennox road",
      City: "Sheffield",
      Postcode: "S6 4FN",
      BranchID: 1,
      RegisterDate: "2024-12-04",
    },
  ],
  status: 200,
};

// Need these to run mock before the test otherwise component will render with null data. 
MemberFrontEndService.mockImplementation(() => {
  return {
    post: jest.fn(),
    get: jest.fn().mockResolvedValue(mockUserData),
  };
});

EmployeeFrontEndService.mockImplementation(() => {
  return {
    post: jest.fn(),
    get: jest.fn().mockResolvedValue(mockUserData),
  };
});

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), 
  useLocation: jest.fn(),
  useNavigate: jest.fn(), 
}));


describe("LoginCard Component Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should handle successful member login with valid credentials", async () => {
    useLocation.mockReturnValue({ pathname: "/account" });

    const mockGet = jest.fn().mockResolvedValue(mockUserData);
    MemberFrontEndService.mockImplementation(() => {
      return {
        get: mockGet,
      };
    });

    const mockOnLoginSuccess = jest.fn();
    const setUserMock = jest.fn();

    render(
      <BrowserRouter>
        <SessionContext.Provider value={{ user: null, setUser: setUserMock }}>
          <LoginCard onLoginSuccess={mockOnLoginSuccess} />
        </SessionContext.Provider>
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@yahoo.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByText("Login"));

    await waitFor(() => {
      expect(mockGet).toHaveBeenCalledWith("/readRecords", {
        Email: "test@yahoo.com",
        Password: "password123",
      });
      expect(setUserMock).toHaveBeenCalledWith(mockUserData.data[0]);
      expect(mockOnLoginSuccess).toHaveBeenCalledWith(true);
    });
  });

  it("should handle successful employee login with valid credentials", async () => {
    useLocation.mockReturnValue({ pathname: "/employee" });

    const mockGet = jest.fn().mockResolvedValue(mockUserData);
    EmployeeFrontEndService.mockImplementation(() => {
      return {
        get: mockGet,
      };
    });

    const mockOnLoginSuccess = jest.fn();
    const setEmployeeMock = jest.fn();

    render(
      <BrowserRouter>
        <SessionContext.Provider value={{ user: null, setEmployee: setEmployeeMock }}>
          <LoginCard onLoginSuccess={mockOnLoginSuccess} />
        </SessionContext.Provider>
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@yahoo.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByText("Login"));

    await waitFor(() => {
      expect(mockGet).toHaveBeenCalledWith("/readRecords", {
        Email: "test@yahoo.com",
        Password: "password123",
      });
      expect(setEmployeeMock).toHaveBeenCalledWith(mockUserData.data[0]);
      expect(mockOnLoginSuccess).toHaveBeenCalledWith(true);
    });
  });

  it("should handle network error during login", async () => {
    useLocation.mockReturnValue({ pathname: "/account" });

    const mockGet = jest.fn().mockRejectedValue(new Error("Network Error"));
    MemberFrontEndService.mockImplementation(() => {
        return{
          get : mockGet,
        }
    });

    const setUserMock = jest.fn();
    const setEmployeeMock = jest.fn();

    render(
      <BrowserRouter>
        <SessionContext.Provider value={{ user: null, setUser: setUserMock }}>
          <LoginCard />
        </SessionContext.Provider>
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByText("Login"));

    await waitFor(() => {
      expect(mockGet).toHaveBeenCalled(); 
      expect(
        screen.getByText(
          "An error occurred during login. Please try again later."
        )
      ).toBeInTheDocument();
      expect(setUserMock).not.toHaveBeenCalled();
      expect(setEmployeeMock).not.toHaveBeenCalled();  
    });
  });

  it("should handle invalid email or password", async () => {
    useLocation.mockReturnValue({ pathname: "/account" });

    // Successful and empty read returns 204 and null data.
    const mockGet = jest.fn().mockResolvedValue(null);
    MemberFrontEndService.mockImplementation(() => {
        return{
          get : mockGet,
        }
    });

    const setUserMock = jest.fn();

    render(
      <BrowserRouter>
        <SessionContext.Provider value={{ user: null, setUser: setUserMock }}>
          <LoginCard />
        </SessionContext.Provider>
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "invalid@yahoo.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "wrongpassword" },
    });

    fireEvent.click(screen.getByText("Login"));

    await waitFor(() => {
      expect(mockGet).toHaveBeenCalled(); 
      expect(
        screen.getByText("Invalid email or password. Please try again.")
      ).toBeInTheDocument();
      expect(setUserMock).not.toHaveBeenCalled();
    });
  });

  it("should not submit with empty email or password", async () => {
    useLocation.mockReturnValue({ pathname: "/media" });

    const mockGet = jest.fn();
    MemberFrontEndService.mockImplementation(() => {
        return{
          get : mockGet,
        }
    });

    const setUserMock = jest.fn();

    render(
      <BrowserRouter>
        <SessionContext.Provider value={{ user: null, setUser: setUserMock }}>
          <LoginCard />
        </SessionContext.Provider>
      </BrowserRouter>
    );

    // Trigger login without entering input
    fireEvent.click(screen.getByText("Login"));

    await waitFor(() => {
      expect(mockGet).not.toHaveBeenCalled(); // No API call should have been made.
      expect(setUserMock).not.toHaveBeenCalled(); 
      expect(screen.getByText("Login to your account")).toBeInTheDocument(); 
    });
  });
});
