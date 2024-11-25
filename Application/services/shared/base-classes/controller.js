const formatDateFields = require("../utils/dateFormatter");

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
   * @param {Array} recordValues - Array of Record values in order.
   * @returns
   */
  createRecord(recordValues) {
    return this.service.createRecordByQuery(recordValues);
  }

  // ------------------------------------- Read Methods ---------------------------------------------------
  /**
   * Reads and returns multiple records based on matching field values.
   * Formats all date fields for each record.
   * 
   * @param {Array} fieldIdentifiers - Array of field identifiers to filter the records.
   * @param {boolean} uniqueFlag - If true, fetch filtered records based on field identifiers.
   * @returns {Array} - Array of formatted records with all date fields properly formatted.
   */
  readRecords(fieldIdentifiers={}, uniqueFlag=false) {
    // Fetch raw records 
    const records = this.service.readRecordsByQuery(fieldIdentifiers, uniqueFlag);
    return formatDateFields(records);
  }

  /**
   * 
   * @param {Array} chars 
   */
  autoComplete(chars){
    return this.service.autoComplete(chars);
  }


  /**
   * Reads and returns multiple fields based on column identifiers.
   * @param {Int} primaryKey - Primary key for the record.
   * @param {Array} columns - columns that should be returned
   * @returns
   */
  readFields(primaryKey, columns) {
    return this.service.readFieldsByQuery(primaryKey, columns);
  }

  // ------------------------------------- Update Methods ---------------------------------------------------
  /**
   * Update a records fields using parallel arrays.
   * @param {Array} newValues - Array of new values.
   * @returns
   */
  updateRecord(newValues) {
    return this.service.updateRecordByQuery(newValues);
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
   * @param {Int} primaryKey
   * @returns
   */
  deleteRecord(primaryKey) {
    return this.service.deleteRecordByQuery(primaryKey);
  }

  /**
   * Delete Multiple records.
   * @param {Array} primaryKeys
   */
  deleteRecords(primaryKeys) {
    return this.service.deleteRecordsByQuery(primaryKeys);
  }

}

module.exports = Contoller;
