// mocks/serviceMocks.js
import { jest } from '@jest/globals';

export const mockMedia = [
  {
    Title: "Test Media",
    Type: "Book",
    Genre: "Fiction",
    Author: "Joe Bloggs",
    PublishDate: "2024-12-03",
    Description: "Test Description",
    BranchID: 1,
  },
];

export const mockGet = jest.fn().mockResolvedValue({ data: mockMedia })
export const mockGenerateImageSrc = jest.fn().mockResolvedValue("test-image-src.jpg")
const mockMediaFrontEndService = jest.fn().mockImplementation(() => {
  return {
    // Base methods
    get: mockGet,
    // Derived methods
    generateImageSrc: mockGenerateImageSrc,
  };
});

export default mockMediaFrontEndService;  
