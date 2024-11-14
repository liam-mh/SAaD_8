const axios = require('axios');
const config = require('../config');


//TODO Need a way of this dynamically assigning this "/account/member/readRecords" so we only need 4 functions
const getMembersFromAccountService = async (req, res) => {
    try {
        const response = await axios.get(`${config.ACCOUNT_SERVICE_API}/account/member/readRecords`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching users from account service:', error);
        res.status(500).send('Internal Server Error');
    }
};

const createMemberInAccountService = async (req, res) => {
    try {
        const recordValues = req.body; //Expecting an array of values in the request body
        const response = await axios.post(
            `${config.ACCOUNT_SERVICE_API}/account/member/createRecord`,
            recordValues, 
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        res.status(201).json(response.data);
    } catch (error) {
        console.error('Error creating member in account service:', error);
        res.status(500).send('Internal Server Error');
    }
};


const updateMemberInAccountService = async (req, res) => {
    try {
        const updateValues = req.body; // Expecting the updated values in the request body

        const response = await axios.put(
            `${config.ACCOUNT_SERVICE_API}/account/member/updateRecord`,
            updateValues, 
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        res.status(200).json(response.data); // Respond with the updated record
    } catch (error) {
        console.error('Error updating member in account service:', error);
        res.status(500).send('Internal Server Error');
    }
};

const deleteMemberInAccountService = async (req, res) => {
    try {
        const { primaryKey } = req.body; 

        const response = await axios.delete(
            `${config.ACCOUNT_SERVICE_API}/account/member/deleteRecord`,
            {
                data: { primaryKey }, 
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        if (response.status === 200) {
            res.status(200).json({ message: "Member deleted successfully", result: response.data });
        } else {
            res.status(404).json({ message: "Member not found", result: response.data });
        }
    } catch (error) {
        console.error('Error deleting member in account service:', error);
        res.status(500).send('Internal Server Error');
    }
};








module.exports = {
    getMembersFromAccountService,
    createMemberInAccountService,
    updateMemberInAccountService,
    deleteMemberInAccountService
};
