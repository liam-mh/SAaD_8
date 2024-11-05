/**
 * Abstract Controller class
 *
 */
class ControllerInterface {
  notificationService;
  /**
   * Constructor
   * @param {Service} service - Specific Service based on derived Controller
   */
  constructor(service) {
    if (this.constructor === Controller) {
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
   * Read and return a record.
   * @param {String} primaryKey - Primary key for the record to read.
   * @returns
   */
  readRecord(primaryKey) {
    return this.service.getFieldByQuery(primaryKey);
  }

  /**
   * Reads and return multiple records based on matching field values.
   * @param {Array} fieldIdentifiers - Array of field identifiers.
   * @returns
   */
  readRecords(fieldIdentifiers) {
    return this.service.readRecordsByQuery(fieldIdentifiers);
  }

  /**
   * Reads and returns a single field matching the PK and column.
   * @param {String} primaryKey - Primary key for the record.
   * @param {String} column - Column to be returned.
   * @returns
   */
  readField(primaryKey, column) {
    return this.service.readFieldByQuery(primaryKey, column);
  }

  /**
   * Reads and returns multiple fields based on column identifiers.
   * @param {String} primaryKey - Primary key for the record.
   * @param {Array} columns - columns that should be returned
   * @returns
   */
  readFields(primaryKey, columns) {
    return this.service.readFieldsByQuery(primaryKey, columns);
  }

  // ------------------------------------- Update Methods ---------------------------------------------------
  /**
   * Update a records fields using parallel arrays.
   * @param {String} primaryKey - Primary key for the record to update.
   * @param {Array} columns - Array of columns.
   * @param {Array} newValues - Array of new values.
   * @returns
   */
  updateRecord(primaryKey, columns, newValues) {
    return this.service.updateRecordByQuery(primaryKey, columns, newValues);
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
   * @param {String} primaryKey
   * @param {String} column
   * @returns
   */
  updateField(primaryKey, column) {
    return this.service.updateFieldByQuery(primaryKey, column);
  }

  /**
   * Delete a single record
   * @param {String} primaryKey
   * @returns
   */
  deleteRecord(primaryKey) {
    return this.service.deletRecord(primaryKey);
  }

  /**
   * Delete Multiple records.
   * @param {Array} primaryKeys
   */
  deleteRecords(primaryKeys) {
    this.deleteRecords(primaryKeys);
  }
}

module.exports = ControllerInterface;
