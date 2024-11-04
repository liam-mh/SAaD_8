const memberService = require('../models/service/memberService');

const createRecord = async (req, res) => {
    try {
        const members = await memberService.createRecordByQuerys();
        console.log('CONTROLLER: ', members);
        res.status(200).json(members);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const readRecord = async (req, res) => {
    try {
        const members = await memberService.readRecordByQuery();
        res.status(200).json(members);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createRecord,
    readRecord
};