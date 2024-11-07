const fs = require('fs');
const path = require('path');
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT, SSL_CA_PATH } = require('../env'); 

const config = {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: parseInt(DB_PORT, 10),
    ssl: {
        ca: fs.readFileSync(path.join(__dirname, SSL_CA_PATH))
    }
};

module.exports = config;