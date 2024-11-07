const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

// Service Port Configuration
const FRONTEND_PORT = process.env.FRONTEND_PORT;
const API_GATEWAY_PORT = process.env.API_GATEWAY_PORT;
const ACCOUNT_SERVICE_PORT = process.env.ACCOUNT_SERVICE_PORT;
const NOTIFICATION_SERVICE_PORT = process.env.NOTIFICATION_SERVICE_PORT;
const PROCUREMENT_SERVICE_PORT = process.env.PROCUREMENT_SERVICE_PORT;
const STOREFRONT_SERVICE_PORT = process.env.STOREFRONT_SERVICE_PORT;

// Database Configuration
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const DB_PORT = process.env.DB_PORT;
const SSL_CA_PATH = process.env.SSL_CA_PATH;

// Optional: Debugging logs
// console.log("FRONTEND_PORT:", FRONTEND_PORT);
// console.log("API_GATEWAY_PORT:", API_GATEWAY_PORT);
// console.log("ACCOUNT_SERVICE_PORT:", ACCOUNT_SERVICE_PORT);
// console.log("NOTIFICATION_SERVICE_PORT:", NOTIFICATION_SERVICE_PORT);
// console.log("PROCUREMENT_SERVICE_PORT:", PROCUREMENT_SERVICE_PORT);
// console.log("STOREFRONT_SERVICE_PORT:", STOREFRONT_SERVICE_PORT);

// console.log("DB_HOST:", DB_HOST);
// console.log("DB_USER:", DB_USER);
// console.log("DB_PASSWORD:", DB_PASSWORD);
// console.log("DB_NAME:", DB_NAME);
// console.log("DB_PORT:", DB_PORT);
// console.log("SSL_CA_PATH:", SSL_CA_PATH);

module.exports = {
    FRONTEND_PORT,
    FRONTEND_ORIGIN: `http://localhost:${FRONTEND_PORT}`,
    API_GATEWAY_PORT,
    API_GATEWAY: `http://localhost:${API_GATEWAY_PORT}/api`,
    ACCOUNT_SERVICE_PORT,
    ACCOUNT_SERVICE_API: `http://localhost:${ACCOUNT_SERVICE_PORT}/api`,
    NOTIFICATION_SERVICE_PORT,
    PROCUREMENT_SERVICE_PORT,
    STOREFRONT_SERVICE_PORT,
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    DB_PORT,
    SSL_CA_PATH
};
