// ==============================
// API Routes Tests
// ==============================

/**
 * Tests for API routes.
 * Unit tests: 
 * 
 * @author Liam Hammond
 */

// ==============================
// IMPORTS
// ==============================
import express from 'express';
import request from 'supertest'; 
import { forwardRequest } from '../../middleware/forwardRequestMiddleware'; 

// ==============================
// MOCK DATA SETUP
// ==============================
const mockServiceApis = {
    account: "http://localhost:4001/api",
    notification: "http://localhost:4002/api",
    storefront: "http://localhost:4004/api",
};
const mock200Response = {
    message: "Records retrieved successfully",
    data: [ { ID: 1 },{ ID: 2 } ],
    status: 200
};
const mock500Response = {
    message: "Failed to retrieve records",
    data: [],
    status: 500
};

// ==============================
// MOCKING DEPENDENCIES
// ==============================
jest.mock('../../middleware/forwardRequestMiddleware', () => ({
    forwardRequest: jest.fn((serviceApiUrl, shouldForward) => {
        return (req, res) => {
            console.log("ForwardRequest called with:", serviceApiUrl, shouldForward);
            res.status(200).json(mock200Response);
        };
    })
}));

const app = express();
app.use('/account', forwardRequest(mockServiceApis.account, true));
app.use('/notification', forwardRequest(mockServiceApis.notification, true));
app.use('/storefront', forwardRequest(mockServiceApis.storefront, true));

// ==============================
// UNIT TESTS
// ==============================
const testPrefix = 'APR';
let testCounter = 1;
const testCase = () => {
    const num = String(testCounter).padStart(3, '0');
    testCounter++;
    return `UT-${testPrefix}-${num}: `;
};

describe(testPrefix + ": API Routes Tests", () => {
    afterEach(() => {
        jest.clearAllMocks(); 
    });

    Object.entries(mockServiceApis).forEach(([serviceName, serviceApiUrl]) => {
        // TEST CASE
        // ==============================
        it(testCase() + `Should forward GET request to correct ${serviceName} API route`, async () => {
            const mockRequest = `/${serviceName}`; 
            const response = await request(app)
                .get(mockRequest)
                .set('Accept', 'application/json')
                .expect(200);  
      
            // RESULTS
            expect(forwardRequest).toHaveBeenCalledWith(serviceApiUrl, true);
            expect(response.body).toEqual(mock200Response);
        });

    });
});