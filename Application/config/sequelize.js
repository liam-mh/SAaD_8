const { Sequelize } = require('sequelize');
const dbConfig = require('../config/azure-db/dbConfig');

// Creates connection to the database

const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: 'mysql',
    dialectOptions: {
        ssl: dbConfig.ssl
    }
})

// Tests connection to the database

try {
    sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database: ', error);
}

try {
    sequelize.sync({ force: false })
    console.log('Database schema synchronised successfully.');
} catch (error) {
    console.error('Unable to synchronise database schema: ', error);
}

module.exports = sequelize;