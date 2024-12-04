import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginCard from '../../../src/components/Login-Card/LoginCard'; 
import { SessionContext } from '../../../src/services/sessionContext';
import { BrowserRouter } from 'react-router-dom'; 
import memberFrontEndService from '../../../src/services/account/memberFrontEndService';

// Mock memberFrontEndService.get method
jest.mock('../../../src/services/account/memberFrontEndService');

describe('LoginCard Component Tests', () => {
  let setUserMock;

  beforeEach(() => {
    setUserMock = jest.fn(); // Mock setUser function
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  

  it('should handle successful login with valid credentials', async () => {
    // Mock a successful response
    memberFrontEndService.get.mockResolvedValue({
      data: [{ Email: 'test@example.com', Password: 'password123' }],
    });

    render(
      <BrowserRouter>
        <SessionContext.Provider value={{ user: null, setUser: setUserMock }}>
          <LoginCard />
        </SessionContext.Provider>
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => {
      expect(memberFrontEndService.get).toHaveBeenCalledTimes(1); // Check if the service was called
      expect(setUserMock).toHaveBeenCalledWith({
        Email: 'test@example.com',
        Password: 'password123',
      }); // Ensure setUser was called with the correct user data
      expect(screen.queryByText('Invalid email or password.')).not.toBeInTheDocument(); // Ensure no error message is shown
    });
  });

  it('should handle network error during login', async () => {
    // Simulate a network error
    memberFrontEndService.get.mockRejectedValue(new Error('Network Error'));

    render(
      <BrowserRouter>
        <SessionContext.Provider value={{ user: null, setUser: setUserMock }}>
          <LoginCard />
        </SessionContext.Provider>
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => {
      expect(screen.getByText('An error occurred during login. Please try again later.')).toBeInTheDocument();
      expect(setUserMock).not.toHaveBeenCalled(); // Ensure setUser was not called
    });
  });

  it('should handle invalid email or password', async () => {
    // Simulate API returning no user
    memberFrontEndService.get.mockResolvedValue({ data: [] });

    render(
      <BrowserRouter>
        <SessionContext.Provider value={{ user: null, setUser: setUserMock }}>
          <LoginCard />
        </SessionContext.Provider>
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'invalid@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'wrongpassword' },
    });

    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => {
      expect(screen.getByText('Invalid email or password. Please try again.')).toBeInTheDocument();
      expect(setUserMock).not.toHaveBeenCalled(); // Ensure setUser was not called
    });
  });

  it('should not submit with empty email or password', async () => {
    render(
      <BrowserRouter>
        <SessionContext.Provider value={{ user: null, setUser: setUserMock }}>
          <LoginCard />
        </SessionContext.Provider>
      </BrowserRouter>
    );

    // Trigger login without entering input
    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => {
      expect(memberFrontEndService.get).not.toHaveBeenCalled(); // No API call should have been made
      expect(setUserMock).not.toHaveBeenCalled(); // No user should be set
      expect(screen.getByText('Login to your account')).toBeInTheDocument(); // Still on the same page
    });
  });
});
