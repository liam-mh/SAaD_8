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

   
    // ------------------------------------- Update Methods ---------------------------------------------------

    /**
     * Update a record in the relative table.
     * 
     * @param {Array} newValues - Array of new values.
     * @param {Boolean} shouldReturn -if the update should also return the record.
     * @returns 
     */
    updateRecordByQuery(newValues, shouldReturn=false) {
        return this.dbHandler.updateByQuery(newValues, shouldReturn);
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