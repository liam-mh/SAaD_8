const mysql = require('mysql2');  // Ensure mysql2 is installed
// Import Sequelize instance
const sequelize = require('../../config/sequelize');

/**
 * Base entity class.
 * Dependency injection - relative table to access.
 */
class DbHandler {

    constructor(tableName, pk, model) {
        this.tableName = tableName;
        this.pk = pk;
        this.model = model;
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
     * @returns {Promise<Object>} - Resolves to an object representing the created record, including any auto-generated fields e.g. primary key.
     */
    async createByQuery(dataObject) {
        // Dynamically retrieve model
        const currentModel = sequelize.model(this.tableName);
        if (!currentModel) {
            throw new Error(`Model for table '${this.tableName}' not found.`);
        }

        // Prepare data for insertion
        const insertData = { ...dataObject };
        delete insertData.MemberID;
        if (Object.keys(insertData).length === 0) {
            throw new Error("No valid data provided for insertion.");
        }

        // Attempt insertion
        try {
            const dbInsert = await currentModel.create(insertData);
            return dbInsert;
        } catch (error) {
            // Sequelize-specific errors
            if (error instanceof sequelize.ValidationError) {
                console.error("Validation Error: ", error.errors);
                throw new Error("Validation failed. Check your input data.");
            }

            if (error instanceof sequelize.DatabaseError) {
                console.error("Database Error: ", error.message);
                throw new Error("A database error occurred. Please try again later.");
            }

            // Other errors
            console.error("Unexpected Error: ", error.message);
            throw new Error("An unexpected error occurred: " + error.message);
        }
    }

    //TODO - dont like the dual param... this should be a flag or a property on the object (all = true)
    /**
     * Read a record or records from the DB based on relative objects properties.
     * @param {Object || String} dataObject - Data object or "*". 
     * @returns {Promise<Array<Object>>} - Resolves to an array of objects representing the queried records. 
     * If no records match the conditions, an empty array is returned.
     */

    async readByQuery(dataObject) {
        // Dynamically retrieve model
        const currentModel = sequelize.model(this.tableName);
        if (!currentModel) {
            throw new Error(`Model for table '${this.tableName}' not found.`);
        }
        let returnedData;

        try {
            // Get all records (No where clause)... TODO - Here we will check for the all property instead.
            if(dataObject === "*") {
                returnedData = await currentModel.findAll();
                return returnedData;
            }
            // Get records based on dataObject properties.
            else {
                const whereClause = {}

                for (const [key, value] of Object.entries(dataObject)) {
                    // Check if the property is not null or undefined and add to conditions
                    if (value !== null && value !== undefined) {
                        whereClause[key] = value;
                    }
                }

                returnedData = await currentModel.findAll({
                    where: whereClause
                })

                return returnedData;
            }
        } catch (error) {
            // Sequelize-specific errors
            if (error instanceof sequelize.ValidationError) {
                console.error("Validation Error: ", error.errors);
                throw new Error("Validation failed. Check your input data.");
            }

            if (error instanceof sequelize.DatabaseError) {
                console.error("Database Error: ", error.message);
                throw new Error("A database error occurred. Please try again later.");
            }

            // Other errors
            console.error("Unexpected Error: ", error.message);
            throw new Error("An unexpected error occurred: " + error.message);
        }
    }
    

    /**
     * Update a record based on relative dataObjects properties.
     * @param {Object} dataObject - relative object based on calling service.
     * @returns {Promise<[number, Object[]?]>} - Resolves to an array:
     *  - The first element is the number of rows affected.
     *  - The second element is an array of the updated records.
    */
    async updateByQuery(dataObject) {
        // Dynamically retrieve model
        const currentModel = sequelize.model(this.tableName);
        if (!currentModel) {
            throw new Error(`Model for table '${this.tableName}' not found.`);
        }
        // Extract the primary key value from the data object.
        const pkValue = dataObject[this.pk];

        const updateData = { ...dataObject };
        if (Object.keys(updateData).length === 0) {
            throw new Error("No valid data provided for update.");
        }
        delete updateData.MemberID;

        // Only include non-null and defined fields
        const filteredUpdateData = {};
        for (const [key, value] of Object.entries(updateData)) {
            if (value !== null && value !== undefined) {
                filteredUpdateData[key] = value;
            }
        }

        try {
            const dbUpdate = await currentModel.update(
                filteredUpdateData,
                {
                    where: {
                        [this.pk]: pkValue
                    }
                }
            )
            return dbUpdate;
        } catch (error) {
            if (error instanceof sequelize.ValidationError) {
                console.error("Validation Error: ", error.errors);
                throw new Error("Validation failed. Check your input data.");
            }

            if (error instanceof sequelize.DatabaseError) {
                console.error("Database Error: ", error.message);
                throw new Error("A database error occurred. Please try again later.");
            }

            // Other errors
            console.error("Unexpected Error: ", error.message);
            throw new Error("An unexpected error occurred: " + error.message);
        }
    }

    /**
     * Delete a record from the DB.
     * @param {Number} primaryKey - Identifier of record to delete.
     * @returns {Promise<Number>} - Resolves with the number of records deleted (0 if no records were found).
     * Rejects with an error object if the deletion fails.
    */
    async deleteByQuery(primaryKey) {
        // Dynamically retrieve model
        const currentModel = sequelize.model(this.tableName);
        if (!currentModel) {
            throw new Error(`Model for table '${this.tableName}' not found.`);
        }

        try {
            const deleteResult = await currentModel.destroy({
                where: {
                    [this.pk]: primaryKey
                },
            });
    
            if (deleteResult === 0) {
                console.warn("No records found to delete. Check the primary key value.");
            } else {
                console.log("Data deleted successfully");
            }
    
            return deleteResult; // Return the number of records deleted
        } catch (err) {
            console.error("Error deleting data:", err);
            throw new Error("Failed to delete record: " + err.message);
        }
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