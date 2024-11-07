const mysql = require('mysql2');  // Ensure mysql2 is installed
const dbConfig = require('../../azure-db/config/dbConfig')

class EntityInterface {
    config = dbConfig
    constructor(tableName) {
        this.tableName = tableName;
        this.connection = mysql.createConnection({
            ...this.config,
            ssl: this.config.ssl
        });
    }

    async connect() {
        return new Promise((resolve, reject) => {
            this.connection.connect((err) => {
                if (err) {
                    console.error('Database connection failed:', err);
                    reject(err);
                } else {
                    console.log('Database connected!');
                    resolve();
                }
            });
        });
    }
    
    async createByQuery(data) {
        const columns = Object.keys(data).join(', ');
        const values = Object.values(data);
        const placeholders = values.map(() => '?').join(', ');
        const query = `INSERT INTO ${this.tableName} (${columns}) VALUES (${placeholders})`;

        return new Promise((resolve, reject) => {
            this.connection.query(query, values, (err, results) => {
                if (err) {
                    console.error('Error inserting data:', err);
                    reject(err);
                } else {
                    console.log('Data inserted successfully');
                    resolve(results);
                }
            });
        });
    }

    async readByQuery(conditions = '', values = []) {
        const query = `SELECT * FROM ${this.tableName} ${conditions}`;
        return new Promise((resolve, reject) => {
            this.connection.query(query, values, (err, results) => {
                if (err) {
                    console.error('Error reading data:', err);
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    async updateByQuery(data, conditions, values) {
        const updates = Object.entries(data)
            .map(([key]) => `${key} = ?`)
            .join(', ');
        const query = `UPDATE ${this.tableName} SET ${updates} WHERE ${conditions}`;
        const combinedValues = [...Object.values(data), ...values]; // Combine values for the update

        return new Promise((resolve, reject) => {
            this.connection.query(query, combinedValues, (err, results) => {
                if (err) {
                    console.error('Error updating data:', err);
                    reject(err);
                } else {
                    console.log('Data updated successfully');
                    resolve(results);
                }
            });
        });
    }

    async deleteByQuery(conditions, values) {
        const query = `DELETE FROM ${this.tableName} WHERE ${conditions}`;
        return new Promise((resolve, reject) => {
            this.connection.query(query, values, (err, results) => {
                if (err) {
                    console.error('Error deleting data:', err);
                    reject(err);
                } else {
                    console.log('Data deleted successfully');
                    resolve(results);
                }
            });
        });
    }

    async disconnect() {
        return new Promise((resolve, reject) => {
            this.connection.end((err) => {
                if (err) {
                    console.error('Error closing database connection:', err);
                    reject(err);
                } else {
                    console.log('Database connection closed');
                    resolve();
                }
            });
        });
    }
}

module.exports = EntityInterface;