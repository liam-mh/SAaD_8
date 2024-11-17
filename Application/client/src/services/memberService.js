const fetchFromApiGateway = require('./apiService');

/**
 * Get Member data from the account service.
 * @param {Array} fields - Array of fields to retrieve.
 * @param {boolean} allFlag - Flag to retrieve all values.
 * @returns {Promise<object>} - The data returned from the account service.
 */
const getMembers = async (fields, allFlag = false) => {
    try {
        const fieldsParam = encodeURIComponent(JSON.stringify(fields)); // Serialize and encode fields array
        const allFlagParam = encodeURIComponent(allFlag);  // Convert allFlag to a query param
        const url = `/account/member/readRecords?fields=${fieldsParam}&allFlag=${allFlagParam}`;
        
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
 * @param {Array} memberData - Array of member values in order.
 * @returns {Promise<object>} - The data returned from the account service.
 */
const createMember = async (memberData) => {
    try {
        const data = await fetchFromApiGateway(`/account/member/createRecord`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(memberData), 
        });
        return data;
    } catch (error) {
        console.error("Error creating member: ", error);
        throw error;
    }
};

/**
 * Update an existing member in the account service.
 * @param {Object} updatedData - An object containing the fields to update.
 * @returns {Promise<object>} - The data returned from the account service.
 */
const updateMember = async (updatedData) => {
    try {
        const response = await fetchFromApiGateway(`/account/member/updateRecord`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),  
        });
        return response; 
    } catch (error) {
        console.error("Error updating member: ", error);
        throw error;  
    }
};

/**
 * Delete an existing member in the account service.
 * @param {Number} primaryKey - The unique identifier of the member to delete.
 * @returns {Promise<object>} - The data returned from the account service.
 */
const deleteMember = async (primaryKey) => {
    try {
        const response = await fetchFromApiGateway(`/account/member/deleteRecord`, {
            method: 'DELETE',  
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ primaryKey }), 
        });
        return response;
    } catch (error) {
        console.error("Error deleting member: ", error);
        throw error; 
    }
};



module.exports = { 
    getMembers,
    createMember,
    updateMember,
    deleteMember
};