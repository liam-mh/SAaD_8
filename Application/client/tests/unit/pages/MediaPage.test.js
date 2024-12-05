import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MediaPage from '../../../src/pages/media';
import { useLocation } from 'react-router-dom';
import mediaFrontEndService from '../../../src/services/storefront/mediaFrontEndService';

// Mock all relevant components and services.
jest.mock('../../../src/components/Branch-Stock-Card/BranchStockCard', () => (props) => (
  <div data-testid="branch-stock-card" onClick={props.onAddToBasket}>
    {props.media.Title} at {props.media.BranchID}
  </div>
));

jest.mock('../../../src/components/Notification-Banner/NotificationBanner', () => (props) => (
  <div data-testid="notification-banner">{props.mediaTitle}</div>
));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}));

jest.mock('../../../src/services/storefront/mediaFrontEndService', () => ({
  get: jest.fn(),
  generateImageSrc: jest.fn(),
}));

describe('MediaPage', () => {
  const mockMedia = [
    {
      Title: 'Test Media',
      Type: 'Book',
      Genre: 'Fiction',
      Author: 'Joe Bloggs',
      PublishDate: '2024-12-03',
      Description: 'Test Description',
      BranchID: 1,
    },
  ];

  beforeEach(() => {
    mediaFrontEndService.get.mockResolvedValue({ data: mockMedia });
    mediaFrontEndService.generateImageSrc.mockReturnValue('test-image-src.jpg');
    
    // Mocking useLocation to return mediaType and mediaTitle
    useLocation.mockReturnValue({
      state: { 
        mediaType: 'Book',
        mediaTitle: 'Test Media',
      },
    });
  });

  it('fetches and displays media data on load', async () => {
    render(<MediaPage />);
  
    // Initial default value
    expect(screen.getByText('Media Title')).toBeInTheDocument();
  
    // Update after load.
    await waitFor(() => {
      expect(screen.getByText('Test Media')).toBeInTheDocument();
    });
  
    // Check for displayed return values. Had to use regex due to issues with multilines.
    expect(screen.getByText(/Genre:\s*Fiction/i)).toBeInTheDocument();
    expect(screen.getByText(/Author:\s*Joe Bloggs/i)).toBeInTheDocument();
    expect(screen.getByText(/Published:\s*2024-12-03/i)).toBeInTheDocument();
    expect(screen.getByAltText('Test Media')).toHaveAttribute('src', 'test-image-src.jpg');
  });

  it('displays a notification when an item is added to the basket', async () => {
    render(<MediaPage />);

    await waitFor(() => screen.getByTestId('branch-stock-card')); 

    // Simulate adding to the basket.
    fireEvent.click(screen.getByTestId('branch-stock-card'));

    // Verify basket update.
    expect(screen.getByTestId('notification-banner')).toHaveTextContent('Test Media');
  });

  it('handles empty media gracefully when the API returns no data', async () => {
    // Mocking a successfull but empty read.
    mediaFrontEndService.get.mockResolvedValueOnce({ data: [] });
  
    render(<MediaPage />);
  
    // Use await and wait for due to rendering timings.
    await waitFor(() => expect(mediaFrontEndService.get).toHaveBeenCalled());
  
    // Check defaults are displayed.
    expect(screen.getByText('Loading image...')).toBeInTheDocument();
    expect(screen.queryByText('Genre:')).not.toBeInTheDocument();
    expect(screen.queryByText('Author:')).not.toBeInTheDocument();
    expect(screen.queryByText('Published:')).not.toBeInTheDocument();
    expect(screen.queryByAltText('Test Media')).not.toBeInTheDocument();
  
    // Wait for error message to be displayed.
    await waitFor(() => expect(screen.getByText(/No media available/i)).toBeInTheDocument());
  });

  it('handles an API error gracefully', async () => {
    // Mock an error response.
    mediaFrontEndService.get.mockRejectedValueOnce(new Error('API Error'));
  
    render(<MediaPage />);
  
    // Wait for the correct error message to be displayed.
    await waitFor(() => {
      expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    });
  });
});
