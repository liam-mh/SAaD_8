/**
 *  Abstract Service class
 */

class ServiceInterface {

    notificationService;
    /**
     * Constructor
     * @param {Entity} entity - Specific Entity based on derived Service 
     */

    constructor(entity, object) {
        if (this.constructor === ServiceInterface) {
            throw new Error("Cannot instantiate abstract class directly.");
        }
        // Inject specific instances
        this.entity = entity; 
        this.object = object
    }

    // Common methods that all services can use

    // ------------------------------------- Create Methods ---------------------------------------------------
    /**
     * Creates a new record
     * @param {Array} recordValues - Array of record values in order.
     * @returns 
     */
    createRecordByQuery(recordValues) {
        this.object.createObjectFromArray(recordValues);
        return this.entity.createByQuery(this.object);
        
    }

    // ------------------------------------- Read Methods ---------------------------------------------------

    /**
     * Reads and returns multiple records based on matching field values.
     * @param {Array} fieldIdentifiers - Array of field identifiers.
     * @returns 
     */
    readRecordsByQuery(fieldIdentifiers, allFlag) {
        
        if(allFlag){
            return this.entity.readByQuery("*");
        }
        this.object.createObjectFromArray(fieldIdentifiers);
        return this.entity.readByQuery(this.object);
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
     * Create Object with new values then pass to entity to update DB.
     * @param {Array} newValues - Array of new values.
     * @returns 
     */
    updateRecordByQuery(newValues) {
        this.object.createObjectFromArray(newValues);
        return this.entity.updateByQuery(this.object);
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
     * @returns {Promise<Object>} - Returns result object.
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