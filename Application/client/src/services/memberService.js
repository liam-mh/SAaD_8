const fetchFromApiGateway = require('./apiService');

/**
 * Fetch members from the account service.
 * @returns {Promise<object>} - The data returned from the account service.
 */
const getAll = async () => {
    try {
        const data = await fetchFromApiGateway('/account/member/readRecords');
        return data;
    } catch (error) {
        console.error("Error fetching members:", error);
        throw error;
    }
};

module.exports = { 
    getAll
};