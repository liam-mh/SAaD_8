const mysql = require('mysql2');  // Ensure mysql2 is installed
const dbConfig = require('../../config/azure-db/dbConfig')

/**
 * Base entity class.
 * Dependency injection - relative table to access.
 */
class DbHandler {
    config = dbConfig
    constructor(tableName, pk) {
        this.tableName = tableName;
        this.pk = pk;
        this.connection = mysql.createConnection({
            ...this.config,
            ssl: this.config.ssl
        });
    }

    /**
     * Connect to the DB.
     * @returns Promise - DB connection.
     */
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
    /**
     * Creates a record in the relative table.
     * @param {Object} dataObject - Object relative to the calling service.
     * @returns {Promise} - Resolves with the query result or rejects with an error.
     */
    async createByQuery(dataObject) {
        // Create query.
        const columns = Object.keys(dataObject).join(', ');
        const values = Object.values(dataObject);
        const placeholders = values.map(() => '?').join(', ');
        const query = `INSERT INTO ${this.tableName} (${columns}) VALUES (${placeholders})`;

        // Insert into DB.
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

    //TODO - dont like the dual param... this should be a flag or a property on the object (all = true)
    /**
     * Read a record or records from the DB based on relative objects properties.
     * @param {Object || String} dataObject - Data object or "*". 
     * @returns {Promise<object>} - Table records or error.
     */
    async readByQuery(dataObject) {
        let whereClause;
        const values = [];
        
        // Get all records (No where clause)... TODO - Here we will check for the all property instead.
        if(dataObject === "*"){
            whereClause = ''
        }
        // Get records based on dataObject properties.
        else{
            const conditions = [];
    
            for (const [key, value] of Object.entries(dataObject)) {
                // Check if the property is not null or undefined and add to conditions
                if (value !== null && value !== undefined) {
                    conditions.push(`${key} = ?`);
                    values.push(value);
                }
            }
            whereClause = `WHERE ${conditions.join(' AND ')}`;
        }
        
        const query = `SELECT * FROM ${this.tableName} ${whereClause}`;
        
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
    

    /**
     * Update a record based on relative dataObjects properties.
     * @param {Object} dataObject - relative object based on calling service.
     * @returns {Promise<Object>} - Resolves with a result object.
     * Rejects with an error object if the update fails.
     */
    async updateByQuery(dataObject) {
        // Extract the primary key value from the data object.
        const pkValue = dataObject[this.pk];

        // Remove the primary key from the update data to avoid updating the primary key.
        const { [this.pk]: _, ...updateFields } = dataObject;

        // Dynamically create the SET clause.
        const updates = Object.entries(updateFields)
            .map(([key]) => `${key} = ?`)
            .join(', ');

        // Prepare the query and values.
        const query = `UPDATE ${this.tableName} SET ${updates} WHERE ${this.pk} = ?`;
        const values = [...Object.values(updateFields), pkValue];

        return new Promise((resolve, reject) => {
            this.connection.query(query, values, (err, results) => {
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

    /**
     * Delete a record from the DB.
     * @param {Number} primaryKey - Identifier of record to delete.
     * @returns {Promise<Object>} - Resolves with a result object.
     * Rejects with an error object if the deletion fails.
     */
    async deleteByQuery(primaryKey) {
        const query = `DELETE FROM ${this.tableName} WHERE ${this.pk} = ?`;

        return new Promise((resolve, reject) => {
            this.connection.query(query, [primaryKey], (err, results) => { 
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

module.exports = DbHandler;