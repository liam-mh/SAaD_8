const memberEntity = require('../entity/memberEntity');

const getMembers = async () => {
    try {
        const users = await memberEntity.readMemberData();
        // Additional transformation logic can go here if needed
        return users;
    } catch (error) {
        throw new Error('Error retrieving users: ' + error.message);
    }
}; 
