const memberService = require('../models/service/memberService');

const getMembers = async (req, res) => {
    try {
        const members = await memberService.getMembers();
        res.status(200).json(members);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getMembers
};