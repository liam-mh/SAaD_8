const axios = require('axios');
const config = require('../config');

const getMembersFromAccountService = async (req, res) => {
    try {
        const response = await axios.get(`${config.ACCOUNT_SERVICE_API}/account`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching users from account service:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    getMembersFromAccountService
};
