const axios = require('axios');

// Function to get user data from account-service
const getUsersFromAccountService = async (req, res) => {
    try {
        const response = await axios.get('http://localhost:3001/api/users'); // Adjust the port based on your setup
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching users from account service:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Export functions to use in routes
module.exports = {
    getUsersFromAccountService
};
