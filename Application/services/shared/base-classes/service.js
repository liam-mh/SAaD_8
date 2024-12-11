//Base service class.
const DbHandler = require("./dbHandler");

/**
 * Base service class
 * @author Guy Nicklin
 */
class Service {

    /**
     * Constructor
     * 
     * @param {DbHandler} dbHandler - Specific database handler based on derived Service.
     */
    constructor(dbHandler) {
        if (this.constructor === Service) {
            throw new Error("Cannot instantiate abstract class directly.");
        }
        // Inject specific instances
        this.dbHandler = dbHandler; 
    }

    // Common methods that all services can use

    // ------------------------------------- Create Methods ---------------------------------------------------
    /**
     * Creates a new record in the relative table.
     * 
     * @param {Object} record - Record to create.
     * @returns {Promise<Object>} - Created Record.
     */
    createRecordByQuery(record) {
        return this.dbHandler.createByQuery(record);
    }

    /**
     * Creates multiple records in the relative table..
     * 
     * @param {Object[]} records - Records to create.
     * @returns {Promise<Object[]>} - Created Records.
     */
    createRecordsByQuery(records){
        return this.dbHandler.createMultipleByQuery(records);
    }

    // ------------------------------------- Read Methods ---------------------------------------------------

    /**
     * Reads and returns multiple records based on matching field values from the raative table.
     * 
     * @param {Array} fieldIdentifiers - Array of field identifiers.
     * @returns 
     */
    readRecordsByQuery(fieldIdentifiers={}, uniqueFlag=false) {
        return this.dbHandler.readByQuery(fieldIdentifiers, uniqueFlag);
    }

    /**
     * Reads and returns 10 records containing the users inputed characters from the relative table.
     * 
     * @param {String} chars - User input.
     */
    autoComplete(chars){
        return this.dbHandler.autoComplete(chars);
    }

    /**
     * Reads and returns a single field matching the PK and column from the relative table.
     * 
     * @param {Int} primaryKey - Primary key for the record.
     * @param {String} column - Column to be returned.
     * @returns 
     */
    readFieldByQuery(primaryKey, column) {
        return this.dbHandler.readByQuery(primaryKey, column);
    }

    /**
     * Reads and returns multiple fields based on column identifiers from the relative table.
     * 
     * @param {Array} primaryKey - Primary key for the records.
     * @param {Array} columns - Columns that should be returned.
     * @returns 
     */
    readFieldsByQuery(primaryKey, columns) {
        return this.dbHandler.readByQuery(primaryKey, columns);
    }

    // ------------------------------------- Update Methods ---------------------------------------------------

    /**
     * Update a record in the relative table.
     * 
     * @param {Array} newValues - Array of new values.
     * @returns 
     */
    updateRecordByQuery(newValues) {
        return this.dbHandler.updateByQuery(newValues);
    }

    /**
     * Updates multiple record's fields.
     * 
     * @param {Array} primaryKeys - Array of primary keys.
     * @param {2D Array} columns - 2D array of column identifiers.
     * @param {2D Array} newValues - 2D array of new values.
     * @returns 
     */
    updateRecordsByQuery(primaryKeys, columns, newValues) {
        return this.dbHandler.updateByQuery(primaryKeys, columns, newValues);
    }

    /**
     * Update a field in a single record.
     * 
     * @param {Int} primaryKey - Primary key of record containing field to be updated.
     * @param {String} field - Field to be updated.
     * @param {*} newValue - New value for the field.
     * @returns 
     */
    updateFieldByQuery(primaryKey, field, newValue) {
        return this.dbHandler.updateByQuery(primaryKey, field, newValue);
    }

    /**
     * Update multiple fields in a single record.
     * 
     * @param {Int} primaryKey - Primary key of record containing fields to be updated.
     * @param {Array} fields - Array of fields to be updated.
     * @param {Array} newValues - Array of new values for each field.
     * @returns 
     */
    updateFieldsByQuery(primaryKey, fields, newValues) {
        return this.dbHandler.updateByQuery(primaryKey, fields, newValues);
    }

    // ------------------------------------- Delete Methods ---------------------------------------------------

    /**
     * Delete a single record from the relative table.
     * 
     * @param {Object} uniqueKey - A key and value pair to identify the record to delete.
     * @returns {Promise<Number>} - The number of records deleted.
     */
    deleteRecordByQuery(uniqueKey) {
        return this.dbHandler.deleteByQuery(uniqueKey);
    }

    /**
     * Deletes Multiple records from the relative table.
     * 
     * @param {Object[]} uniqueKeys - An array of key and value pairs to identify the records to delete.
     * @returns {Promise<Number>} - The number of records deleted.
     */
    deleteRecordsByQuery(uniqueKeys) {
        return this.dbHandler.deleteMultipleByQuery(uniqueKeys);
    }
}

module.exports = Service;