const { API_GATEWAY } = require('./apiService');

const fetchMembers = async () => {
    try {
        const response = await fetch(`${API_GATEWAY}/account/member/readRecord`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data; 
    } catch (error) {
        console.error("Error fetching members:", error);
        throw error; 
    }
};

module.exports = { 
    fetchMembers
};