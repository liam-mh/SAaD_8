// ==============================
// ForwardRequest Middleware Tests
// ==============================

/**
 * Tests for ForwardRequest middleware.
 * Unit tests: 6
 * 
 * @author Liam Hammond
 */

// ==============================
// IMPORTS
// ==============================
import axios from "axios";
import { forwardRequest } from "../../middleware/forwardRequestMiddleware";

// ==============================
// MOCK DATA SETUP
// ==============================
const mockServiceApis = {
    accountService: "http://localhost:4001/api",
    storefrontService: "http://localhost:4004/api",
    notificationService: "http://localhost:4002/api",
};

// ==============================
// MOCKING DEPENDENCIES
// ==============================
jest.mock("axios");
const mockNext = jest.fn();

// ==============================
// UNIT TESTS
// ==============================
const testPrefix = 'FWD';
let testCounter = 1;
const testCase = () => {
    const num = String(testCounter).padStart(3, '0');
    testCounter++;
    return `UT-${testPrefix}-${num}: `; 
};

describe(testPrefix + ": ForwardRequest Middleware Tests", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    // Loop over each service to test the forwarding
    Object.entries(mockServiceApis).forEach(([serviceName, serviceApiUrl]) => {
        describe(`${serviceName} Service`, () => {

            // TEST CASE
            // ==============================
            it(testCase() + `Should forward request to correct ${serviceName} API`, async () => {
                const mockRequest = `/api/${serviceName}/table/req`;
                const req = {
                    method: "GET",
                    originalUrl: mockRequest,
                    body: {},
                    headers: {}, 
                };
                const res = {
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn(),
                };
                axios.mockResolvedValue({
                    status: 200,
                    data: { message: `${serviceName} Success` },
                });

                // ACTIONS
                const middleware = forwardRequest(serviceApiUrl, true);
                await middleware(req, res, mockNext);

                // RESULTS
                expect(axios).toHaveBeenCalledWith({
                    method: "GET",
                    url: `${serviceApiUrl}/table/req`,
                    data: {},
                    headers: {},
                });
                expect(res.status).toHaveBeenCalledWith(200);
                expect(res.json).toHaveBeenCalledWith({ message: `${serviceName} Success` });
            });

            // TEST CASE
            // ==============================
            it(testCase() + `Should handle error response from ${serviceName} API`, async () => {
                const mockRequest = `/api/${serviceName}/table/req`;
                const req = {
                    method: "GET",
                    originalUrl: mockRequest,
                    body: {},
                    headers: {},
                };
                const res = {
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn(),
                };
                axios.mockRejectedValue(new Error("Network Error"));

                // ACTIONS
                const middleware = forwardRequest(serviceApiUrl, true);
                await middleware(req, res, mockNext);

                // RESULTS
                expect(res.status).toHaveBeenCalledWith(500);
                expect(res.json).toHaveBeenCalledWith({
                    details: "Service unavailable",
                    error: "Network Error",
                });
            });
        });
    });
});