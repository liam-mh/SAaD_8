//Base service class.
const DbHandler = require("./dbHandler");

class Service {

    /**
     * Constructor
     * @param {DbHandler} dbHandler - Specific database handler based on derived Service.
     */

    constructor(dbHandler, object) {
        if (this.constructor === Service) {
            throw new Error("Cannot instantiate abstract class directly.");
        }
        // Inject specific instances
        this.dbHandler = dbHandler; 
        this.object = object
    }

    // Common methods that all services can use

    // ------------------------------------- Validation methods -----------------------------------------------

    isEmpty = (obj) => Object.keys(obj).length === 0;

    // ------------------------------------- Create Methods ---------------------------------------------------
    /**
     * Creates a new record in the relative table based on dependency injection.
     * @param {Object} record - Record to create.
     * @returns {Promise<Object>} - Created Record.
     */
    createRecordByQuery(record) {
        return this.dbHandler.createByQuery(record);
    }

    /**
     * Creates multiple records in the relative table based on dependency injection.
     * @param {Object[]} records - Records to create.
     * @returns {Promise<Object[]>} - Created Records.
     */
    createRecordsByQuery(records){
        return this.dbHandler.createMultipleByQuery(records);
    }

    // ------------------------------------- Read Methods ---------------------------------------------------

    /**
     * Reads and returns multiple records based on matching field values.
     * @param {Array} fieldIdentifiers - Array of field identifiers.
     * @returns 
     */
    readRecordsByQuery(fieldIdentifiers={}, uniqueFlag=false) {
        
        // Skip object mapping and just retrieve all records for the relevant table.
        if(this.isEmpty(fieldIdentifiers) && !uniqueFlag){
            return this.dbHandler.readByQuery();
        }

        // Map to the relevant object.
        //this.object.mapObject(fieldIdentifiers);

        return this.dbHandler.readByQuery(fieldIdentifiers, uniqueFlag);
    }

    /**
     * 
     * @param {String} chars 
     */
    autoComplete(chars){
        return this.dbHandler.autoComplete(chars);
    }

    /**
     * Reads and returns a single field matching the PK and column.
     * @param {Int} primaryKey - Primary key for the record.
     * @param {String} column - Column to be returned.
     * @returns 
     */
    readFieldByQuery(primaryKey, column) {
        return this.dbHandler.readByQuery(primaryKey, column);
    }

    /**
     * Reads and returns multiple fields based on column identifiers.
     * @param {Array} primaryKey - Primary key for the records.
     * @param {Array} columns - Columns that should be returned.
     * @returns 
     */
    readFieldsByQuery(primaryKey, columns) {
        return this.dbHandler.readByQuery(primaryKey, columns);
    }

    // ------------------------------------- Update Methods ---------------------------------------------------

    /**
     * Create Object with new values then pass to dbHandler to update DB.
     * @param {Array} newValues - Array of new values.
     * @returns 
     */
    updateRecordByQuery(newValues) {
        this.object.mapObject(newValues);
        return this.dbHandler.updateByQuery(this.object);
    }

    /**
     * Updates multiple record's fields.
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
     * Delete a single record.
     * @param {Int} primaryKey - Primary key of the record to be deleted.
     * @returns {Promise<Object>} - Returns result object.
     */
    deleteRecordByQuery(primaryKey) {
        return this.dbHandler.deleteByQuery(primaryKey);
    }

    /**
     * Delete multiple records.
     * @param {Array} primaryKeys - Array of primary keys for the records to be deleted.
     * @returns 
     */
    deleteRecordsByQuery(primaryKeys) {
        return this.dbHandler.deleteByQuery(primaryKeys);
    }
}

module.exports = Service;