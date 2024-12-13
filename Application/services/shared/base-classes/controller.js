const formatDateFields = require("../utils/dateFormatter");

/**
 * Base controller class.
 * @author Guy Nicklin
 */
class Contoller {
  /**
   * Constructor
   * @param {Service} service - Specific Service based on derived Controller
   */
  constructor(service) {
    if (this.constructor === Contoller) {
      throw new Error(
        "Controller is an abstract class and cannot be instantiated directly."
      );
    }
    this.service = service; // Inject the specific service instance
  }

  // Common methods that all controllers can use

  // ------------------------------------- Create Methods ---------------------------------------------------
  /**
   * Creates a new record.
   * @param {Object} recordValues - Array of Record values in order.
   * @returns {Promise<Object>} - Created Record.
   */
  createRecord(record) {
    return this.service.createRecordByQuery(record);
  }

  /**
   * Creates multiple new records.
   * @param {Object} records 
   * @returns {Promise<Object>} - Created Records.
   */
  createRecords(records){
    return this.service.createRecordsByQuery(records);
  }

  // ------------------------------------- Read Methods ---------------------------------------------------
  /**
   * Reads and returns multiple records based on matching field values.
   * Formats all date fields for each record.
   * 
   * @param {Array} fieldIdentifiers - Array of field identifiers to filter the records.
   * @param {boolean} uniqueFlag - If true, fetch filtered records based on field identifiers.
   * @returns {Promise<Object>} - Retrieved Records.
   */
  readRecords(fieldIdentifiers={}, uniqueFlag=false) {
    // Fetch raw records 
    const records = this.service.readRecordsByQuery(fieldIdentifiers, uniqueFlag);
    return formatDateFields(records);
  }

  /**
   * Retrieve Records based on user search input.
   * 
   * @param {String} chars 
   */
  autoComplete(chars){
    return this.service.autoComplete(chars);
  }


  /**
   * Reads and returns multiple fields based on column identifiers.
   * 
   * @param {Int} primaryKey - Primary key for the record.
   * @param {Array} columns - columns that should be returned
   * @returns
   */
  readFields(primaryKey, columns) {
    return this.service.readFieldsByQuery(primaryKey, columns);
  }

  // ------------------------------------- Update Methods ---------------------------------------------------
  /**
   * Update a record based on a unique key.
   * @param {String}
   * @param {Object} newObject - Object of new values.
   * @returns {Promise<Object>} - Created Records.
   */
  updateRecord(newObject) {
    return this.service.updateRecordByQuery(newObject);
  }

  /**
   * Update multiple records fields using parallel 2d arrays.
   * @param {Array} primaryKeys - Array of primary keys.
   * @param {Array of Arrays} columns - 2d Array of column identifiers.
   * @param {Array of Arrays} newValues - 2d array of updated values.
   */
  updateRecords(primaryKeys, columns, newValues) {
    return this.service.updateRecordsByQuery(primaryKeys, columns, newValues);
  }

  /**
   * Update a field in a single record.
   * @param {Int} primaryKey
   * @param {String} column
   * @returns
   */
  updateField(primaryKey, field, newValue) {
    return this.service.updateFieldByQuery(primaryKey, column, newValue);
  }

  /**
   * 
   * @param {Int} primaryKey - Primary key of record to update.
   * @param {Array} fields - Array of fields to be updated.
   * @param {Array} newValues - Array of new values to update fields with.
   * @returns 
   */
  updateFields(primaryKey, fields, newValues) {
    return this.service.updateFieldByQuery(primaryKey, fields, newValues)
  }

  /**
   * Delete a single record
   * @param {Object} uniqueKey - A key and value pair to identify the record to delete.
   * @returns {Promise<Number>} - The number of records deleted (0 or 1).
   */
  deleteRecord(uniqueKey) {
    return this.service.deleteRecordByQuery(uniqueKey);
  }

  /**
   * Delete Multiple records.
   * 
   * @param {Object[]} uniqueKeys - An array of key and value pairs to identify the records to delete.
   * @returns {Promise<Number>} - The number of records deleted (0, 1 or many).
   */
  deleteRecords(uniqueKeys) {
    return this.service.deleteRecordsByQuery(uniqueKeys);
  }

}

module.exports = Contoller;
