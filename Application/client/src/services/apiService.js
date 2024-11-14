const config = require('../config.json');

const API_GATEWAY = config.API_GATEWAY;

/**
 * A generic function to make a request to the API Gateway.
 * @param {string} endpoint - The endpoint of the service to interact with.
 * @param {object} options - Fetch options like headers, method, etc.
 * @returns {Promise<object>} - The response data from the service.
 */
const fetchFromApiGateway = async (endpoint, options = {}) => {
    try {
        const response = await fetch(`${API_GATEWAY}${endpoint}`, options);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;  
    }
};

module.exports = fetchFromApiGateway;