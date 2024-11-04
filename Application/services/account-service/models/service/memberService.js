const MemberEntity = require('../entity/memberEntity');
const memberEntity = new MemberEntity();

const createRecordByQuery = async () => {
    try {
        const users = await memberEntity.createRecordByQuery();
        // Additional transformation logic can go here if needed
        return users;
    } catch (error) {
        throw new Error('Error adding users: ' + error.message);
    }
};

const readRecordByQuery = async () => {
    try {
        const users = await memberEntity.readByQuery();
        console.log('SERVICE: ', users);
        // Additional transformation logic can go here if needed
        return users;
    } catch (error) {
        throw new Error('Error retrieving users: ' + error.message);
    }
};

module.exports = {
    createRecordByQuery,
    readRecordByQuery
};