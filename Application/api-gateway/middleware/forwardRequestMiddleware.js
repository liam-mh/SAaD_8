const axios = require('axios');

/**
 * Generic function to forward requests to a specified service URL.
 * @param {object} req - The incoming request object from the client.
 * @param {object} res - The response object to send back to the client.
 * @param {string} serviceApi - The base URL of the target service.
 * @param {boolean} isRedirect - Specifies if the request path should be appended to the service API URL.
 */
const forwardRequest = (serviceApi, isRedirect = false) => {
    return async(req, res, next) => {
        console.log('SERVICE API:', serviceApi);
        console.log('ORIGINAL URL:', req.originalUrl);
        const forwardUrl = isRedirect ? redirectUrl(serviceApi, req.originalUrl) : serviceApi;

    try {
        const response = await axios({
            method: req.method,
            url: forwardUrl,
            data: req.body,
            headers: req.headers,
        });
        
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error(`Error forwarding request to ${serviceApi}:`, error);
        const status = error.response ? error.response.status : 500;
        res.status(status).json({
            error: error.message,
            details: error.response?.data || 'Service unavailable',
        });
    }
    };
};

/**
 * Constructs the full URL to forward the request to, appending the request path to the base service API URL.
 * @param {string} serviceApi - The base URL of the target service.
 * @param {string} originalUrl - The original URL from the incoming request.
 * @returns {string} - The constructed URL for the request forwarding.
 */
const redirectUrl = (serviceApi, originalUrl) => {
    if (!serviceApi || !originalUrl) {
        throw new Error("Missing required parameters: serviceApi and originalUrl must be defined.");
    }
    
    const target = originalUrl.replace(/^\/api\/\w+/, '');
    const forwardUrl = `${serviceApi}${target}`;
    console.log(`Forwarding request to: ${forwardUrl}`);
    return forwardUrl;
};

module.exports = { forwardRequest };
