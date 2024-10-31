const userEntity = require('../entity/userEntity');

const getUsers = async () => {
    try {
        const users = await userEntity.readUserData();
        // Additional transformation logic can go here if needed
        return users;
    } catch (error) {
        throw new Error('Error retrieving users: ' + error.message);
    }
};

module.exports = {
    getUsers
};