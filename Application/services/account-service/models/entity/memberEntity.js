const fs = require('fs');
const path = require('path');

// Function to read user data from JSON file
const readMemberData = () => {
    return new Promise((resolve, reject) => {
        const filePath = path.join(__dirname, 'testUsers.json'); // Path to your JSON file

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                return reject(err);
            }
            try {
                const users = JSON.parse(data);
                resolve(users);
            } catch (parseError) {
                reject(parseError);
            }
        });
    });
};

module.exports = {
    readMemberData
};