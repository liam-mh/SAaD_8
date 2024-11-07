/**
 *  Abstract Service class
 */

class ServiceInterface {

    notificationService;
    /**
     * Constructor
     * @param {Entity} entity - Specific Entity based on derived Service 
     */

    constructor(entity) {
        if (this.constructor === Service) {
            throw new Error("Cannot instantiate abstract class directly.");
        }

        this.entity = entity; // Inject the specific entity instance
    }

    // Common methods that all services can use

    // ------------------------------------- Create Methods ---------------------------------------------------
    /**
     * Creates a new record
     * @param {Array} recordValues - Array of record values in order.
     * @returns 
     */
    createRecordByQuery(recordValues) {
        return this.entity.createByQuery(recordValues);
    }

    // ------------------------------------- Read Methods ---------------------------------------------------
    /**
     * Read and return a record.
     * @param {Int} primaryKey - Primary key for the record to read.
     * @returns 
     */
    readRecordByQuery(primaryKey) {
        return this.entity.readByQuery(primaryKey);
    }

    /**
     * Reads and returns multiple records based on matching field values.
     * @param {Array} fieldIdentifiers - Array of field identifiers.
     * @returns 
     */
    readRecordsByQuery(fieldIdentifiers) {
        return this.entity.readByQuery(fieldIdentifiers);
    }

    /**
     * Reads and returns a single field matching the PK and column.
     * @param {Int} primaryKey - Primary key for the record.
     * @param {String} column - Column to be returned.
     * @returns 
     */
    readFieldByQuery(primaryKey, column) {
        return this.entity.readByQuery(primaryKey, column);
    }

    /**
     * Reads and returns multiple fields based on column identifiers.
     * @param {Array} primaryKey - Primary key for the records.
     * @param {Array} columns - Columns that should be returned.
     * @returns 
     */
    readFieldsByQuery(primaryKey, columns) {
        return this.entity.readByQuery(primaryKey, columns);
    }

    // ------------------------------------- Update Methods ---------------------------------------------------

    /**
     * Updates a record's fields.
     * @param {Int} primaryKey - Primary key for the record to be updated.
     * @param {Array} columns - Array of columns.
     * @param {Array} newValues - Array of new values.
     * @returns 
     */
    updateRecordByQuery(primaryKey, columns, newValues) {
        return this.entity.updateByQuery(primaryKey, columns, newValues);
    }

    /**
     * Updates multiple record's fields.
     * @param {Array} primaryKeys - Array of primary keys.
     * @param {2D Array} columns - 2D array of column identifiers.
     * @param {2D Array} newValues - 2D array of new values.
     * @returns 
     */
    updateRecordsByQuery(primaryKeys, columns, newValues) {
        return this.entity.updateByQuery(primaryKeys, columns, newValues);
    }

    /**
     * Update a field in a single record.
     * @param {Int} primaryKey - Primary key of record containing field to be updated.
     * @param {String} field - Field to be updated.
     * @param {*} newValue - New value for the field.
     * @returns 
     */
    updateFieldByQuery(primaryKey, field, newValue) {
        return this.entity.updateByQuery(primaryKey, field, newValue);
    }

    /**
     * Update multiple fields in a single record.
     * @param {Int} primaryKey - Primary key of record containing fields to be updated.
     * @param {Array} fields - Array of fields to be updated.
     * @param {Array} newValues - Array of new values for each field.
     * @returns 
     */
    updateFieldsByQuery(primaryKey, fields, newValues) {
        return this.entity.updateByQuery(primaryKey, fields, newValues);
    }

    // ------------------------------------- Delete Methods ---------------------------------------------------

    /**
     * Delete a single record.
     * @param {Int} primaryKey - Primary key of the record to be deleted.
     * @returns 
     */
    deleteRecordByQuery(primaryKey) {
        return this.entity.deleteByQuery(primaryKey);
    }

    /**
     * Delete multiple records.
     * @param {Array} primaryKeys - Array of primary keys for the records to be deleted.
     * @returns 
     */
    deleteRecordsByQuery(primaryKeys) {
        return this.entity.deleteByQuery(primaryKeys);
    }
}

module.exports = ServiceInterface;