const { Sequelize} = require('sequelize');
const { Op } = require('sequelize');
const dbConfig = require('../config/azure-db/dbConfig');


// Create a connection to the database.
const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: 'mysql',
    dialectOptions: {
        ssl: dbConfig.ssl
    },
    logging: false 
});

// Test connection to the database.
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database: ', error);
    }
}

// Sync the database schema.
async function syncDatabase() {
    try {
        await sequelize.sync({ force: false }); 
        console.log('Database schema synchronized successfully.');
    } catch (error) {
        console.error('Unable to synchronize database schema: ', error);
    }
}

testConnection();
syncDatabase();

module.exports = sequelize;
