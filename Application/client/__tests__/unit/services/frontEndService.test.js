import FrontEndService from '../../../src/services/frontEndService';
import fetchFromApiGateway from '../../../src/services/apiService';

/**
 * Unit tests for front end service
 * @author Guy Nicklin
 */

jest.mock('../../../src/services/apiService'); // Mock the fetchFromApiGateway module

describe('FrontEndService', () => {
  const baseRoute = 'https://api.example.com';
  let service;

  beforeEach(() => {
    fetchFromApiGateway.mockReset();
    service = new FrontEndService(baseRoute);
  });

  it('should throw an error if a baseRoute is not provided', () => {
    expect(() => {
      new FrontEndService();
    }).toThrow('Base route is required');
  });

  describe('GET method', () => {
    it('should call fetchFromApiGateway with the correct URL and parameters', async () => {
      const path = '/media';
      const fields = { title: 'test' };
      const uniqueFlag = true;
      const mockResponse = { data: 'test data' };

      fetchFromApiGateway.mockResolvedValueOnce(mockResponse);

      const response = await service.get(path, fields, uniqueFlag);

      expect(fetchFromApiGateway).toHaveBeenCalledWith(
        `${baseRoute}${path}?fields=${encodeURIComponent(
          JSON.stringify(fields)
        )}&uniqueFlag=${encodeURIComponent(JSON.stringify(uniqueFlag))}`,
        expect.objectContaining({
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })
      );
      expect(response).toEqual(mockResponse);
    });

    it('should throw an error if the fetch fails', async () => {
      const path = '/media';
      fetchFromApiGateway.mockRejectedValueOnce(new Error('API Error'));

      await expect(service.get(path)).rejects.toThrow('API Error');
    });
  });

  describe('POST method', () => {
    it('should call fetchFromApiGateway with the correct URL and body', async () => {
      const path = '/media';
      const body = { title: 'test' };
      const mockResponse = { data: 'test data' };

      fetchFromApiGateway.mockResolvedValueOnce(mockResponse);

      const response = await service.post(path, body);

      expect(fetchFromApiGateway).toHaveBeenCalledWith(
        `${baseRoute}${path}`,
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
      );
      expect(response).toEqual(mockResponse);
    });

    it('should throw an error if the fetch fails', async () => {
      const path = '/media';
      const body = { title: 'test' };
      fetchFromApiGateway.mockRejectedValueOnce(new Error('API Error'));

      await expect(service.post(path, body)).rejects.toThrow('API Error');
    });
  });

  describe('PUT method', () => {
    it('should call fetchFromApiGateway with the correct URL and body', async () => {
      const path = '/media';
      const body = { title: 'updated test' };
      const mockResponse = { data: 'updated data' };

      fetchFromApiGateway.mockResolvedValueOnce(mockResponse);

      const response = await service.put(path, body);

      expect(fetchFromApiGateway).toHaveBeenCalledWith(
        `${baseRoute}${path}`,
        expect.objectContaining({
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
      );
      expect(response).toEqual(mockResponse);
    });

    it('should throw an error if the fetch fails', async () => {
      const path = '/media';
      const body = { title: 'updated test' };
      fetchFromApiGateway.mockRejectedValueOnce(new Error('API Error'));

      await expect(service.put(path, body)).rejects.toThrow('API Error');
    });
  });

  describe('DELETE method', () => {
    it('should call fetchFromApiGateway with the correct URL and body', async () => {
      const path = '/media';
      const body = { title: 'delete test' };
      const mockResponse = { data: 'delete data' };

      fetchFromApiGateway.mockResolvedValueOnce(mockResponse);

      const response = await service.delete(path, body);

      expect(fetchFromApiGateway).toHaveBeenCalledWith(
        `${baseRoute}${path}`,
        expect.objectContaining({
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
      );
      expect(response).toEqual(mockResponse);
    });

    it('should throw an error if the fetch fails', async () => {
      const path = '/media';
      const body = { title: 'delete test' };
      fetchFromApiGateway.mockRejectedValueOnce(new Error('API Error'));

      await expect(service.delete(path, body)).rejects.toThrow('API Error');
    });
  });

  describe('autoComplete method', () => {
    it('should call fetchFromApiGateway with the correct URL', async () => {
      const chars = 'test';
      const mockResponse = { suggestions: ['test1', 'test2'] };

      fetchFromApiGateway.mockResolvedValueOnce(mockResponse);

      const response = await service.autoComplete(chars);

      expect(fetchFromApiGateway).toHaveBeenCalledWith(
        `${baseRoute}/autoComplete?chars=${encodeURIComponent(chars)}`,
        expect.objectContaining({
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })
      );
      expect(response).toEqual(mockResponse);
    });

    it('should throw an error if the fetch fails', async () => {
      const chars = 'test';
      fetchFromApiGateway.mockRejectedValueOnce(new Error('API Error'));

      await expect(service.autoComplete(chars)).rejects.toThrow('API Error');
    });
  });
});
