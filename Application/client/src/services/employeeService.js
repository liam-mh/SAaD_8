const fetchFromApiGateway = require('./apiService');

/**
 * Get Employee data from the account service.
 * @param {Array} fields - Array of fields to retrieve.
 * @param {boolean} allFlag - Flag to retrieve all values.
 * @returns {Promise<object>} - The data returned from the account service.
 */
const getEmployee = async (fields, allFlag = false) => {
    try {
        const fieldsParam = encodeURIComponent(JSON.stringify(fields)); // Serialize and encode fields array
        const allFlagParam = encodeURIComponent(allFlag);  // Convert allFlag to a query param
        const url = `/account/employee/readRecords?fields=${fieldsParam}&allFlag=${allFlagParam}`;
        
        const response = await fetchFromApiGateway(url, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response;
    } catch (error) {
        console.error("Error fetching members: ", error);
        throw error;
    }
};

/**
 * Create a new member in the account service.
 * @param {Array} employeeData - Array of member values in order.
 * @returns {Promise<object>} - The data returned from the account service.
 */
const createEmployee = async (employeeData) => {
    try {
        const data = await fetchFromApiGateway(`/account/member-subscription/createRecord`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(employeeData), 
        });
        return data;
    } catch (error) {
        console.error("Error creating member: ", error);
        throw error;
    }
};




module.exports = {
    getEmployee,
    createEmployee
}