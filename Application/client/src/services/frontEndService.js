const fetchFromApiGateway = require('./apiService');

class FrontEndService {
    constructor(baseRoute) {
        if (!baseRoute) {
            throw new Error("Base route is required");
        }
        this.baseRoute = baseRoute;
    }

    /**
     * Perform a GET request.
     * @param {string} path - The endpoint path.
     * @param {object} queryParams - Query parameters to include in the URL.
     * @returns {Promise<object>} - The API response.
     */
    async get(path, queryParams = {}) {
        const queryString = Object.entries(queryParams)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(JSON.stringify(value))}`)
            .join('&');
        const url = `${this.baseRoute}${path}?${queryString}`;
        
        try {
            return await fetchFromApiGateway(url, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
        } catch (error) {
            console.error(`Error fetching data from ${url}:`, error);
            throw error;
        }
    }

    /**
     * Perform a POST request.
     * @param {string} path - The endpoint path.
     * @param {object} body - The request payload.
     * @returns {Promise<object>} - The API response.
     */
    async post(path, body) {
        const url = `${this.baseRoute}${path}`;
        console.log(url)
        try {
            return await fetchFromApiGateway(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
        } catch (error) {
            console.error(`Error posting to ${url}:`, error);
            throw error;
        }
    }

    /**
     * Perform a PUT request.
     * @param {string} path - The endpoint path.
     * @param {object} body - The request payload.
     * @returns {Promise<object>} - The API response.
     */
    async put(path, body) {
        const url = `${this.baseRoute}${path}`;
        try {
            return await fetchFromApiGateway(url, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
        } catch (error) {
            console.error(`Error putting to ${url}:`, error);
            throw error;
        }
    }

    /**
     * Perform a DELETE request.
     * @param {string} path - The endpoint path.
     * @param {object} body - The request payload.
     * @returns {Promise<object>} - The API response.
     */
    async delete(path, body) {
        const url = `${this.baseRoute}${path}`;
        try {
            return await fetchFromApiGateway(url, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
        } catch (error) {
            console.error(`Error deleting at ${url}:`, error);
            throw error;
        }
    }
}


module.exports = FrontEndService;

