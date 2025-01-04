// ==============================
// API Routes Tests
// ==============================

/**
 * Tests for API routes.
 * Unit tests: 7
 * 
 * @author Liam Hammond
 */

// ==============================
// IMPORTS
// ==============================
import express from 'express';
import request from 'supertest'; 

// ==============================
// MOCK DATA SETUP
// ==============================
const mockServiceApis = {
    account: "http://localhost:4001/api",
    notification: "http://localhost:4002/api",
    storefront: "http://localhost:4004/api",
};

// ==============================
// MOCKING DEPENDENCIES
// ==============================
const mockForwardRequest = (serviceApiUrl) => {
    return (req, res) => {
        if (req.query.fail === 'true') {
            res.status(500).json({
                message: "Failed to retrieve records",
                data: [],
                route: req.originalUrl,
                status: 500
            });
        } else {
            res.status(200).json({
                message: "Records retrieved successfully",
                data: [{ ID: 1 }, { ID: 2 }],
                route: req.originalUrl,
                status: 200
            });
        }
    };
};

const app = express();
app.use('/account', mockForwardRequest(mockServiceApis.account));
app.use('/notification', mockForwardRequest(mockServiceApis.notification));
app.use('/storefront', mockForwardRequest(mockServiceApis.storefront));

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
            expect(response.body).toEqual({
                message: "Records retrieved successfully",
                data: [{ ID: 1 }, { ID: 2 }],
                route: `/${serviceName}`,
                status: 200
            });
        });

        it(testCase() + `Should handle a 500 response from ${serviceName} API route`, async () => {
            const mockRequest = `/${serviceName}?fail=true`;
            const response = await request(app)
                .get(mockRequest)
                .set('Accept', 'application/json')
                .expect(500); 
        
            // RESULTS
            expect(response.body).toEqual({
                message: "Failed to retrieve records",
                data: [],
                route: `/${serviceName}?fail=true`,
                status: 500
            });
        });
    });

    it(testCase() + "Should return 404 for an invalid route", async () => {
        const response = await request(app)
            .get('/invalid-route')
            .set('Accept', 'application/json')
            .expect(404);
    
        expect(response.body).toEqual({
            error: "Not Found"
        });
    });
});