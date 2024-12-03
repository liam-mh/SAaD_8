const mysql = require("mysql2");
const sequelize = require("../../../config/sequelize");
const { Op, ValidationError, DatabaseError } = require("sequelize");

/**
 * Base database handler class.
 */
class DbHandler {
  /**
   * @param {Object} model - the injected model based on derived class.
   * @param {Array<String>} removeFromGrouping - An array of keys to disregard when grouping to get unique values.
   */

  constructor(model, removeFromGrouping=[], autoCompleteQueryFields=[]) {
    this.model = model;
    this.removeFromGrouping = removeFromGrouping;
    this.autoCompleteQueryFields = autoCompleteQueryFields
  }

  // ------------------------------------- Error Handling -----------------------------------------------

  /**
   * @private
   *
   * Handles errors by categorizing them and throwing appropriate messages.
   *
   * @param {Error} error - The error to handle.
   * @throws {Error} - Throws categorized errors with specific messages.
   */
  #handleError(error) {
    if (error instanceof ValidationError) {
      console.error("Validation Error: ", error.errors);
      throw new Error("Validation failed. Check your input data.");
    }

    if (error instanceof DatabaseError) {
      console.error("Database Error: ", error.message);
      throw new Error("A database error occurred. Please try again later.");
    }

    console.error("Unexpected Error: ", error.message);
    throw new Error("An unexpected error occurred: " + error.message);
  }

  /**
   * @private
   *
   * Updates the query object to only return unique values by disregarding the pk.
   * Removes the primary key Attribute from the query.
   * Sets the remaining model attributes to only return the min value.
   *
   * @param {Object} queryOptions - The current query options Object.
   * @returns {Object} - An updated query object that will only return unique values.
   */
  #makeRecordsUnique(queryOptions) {
    const modelAttributes = Object.keys(this.model.getAttributes()).filter(
      (attr) => attr !== this.model.primaryKeyAttribute && !this.removeFromGrouping.includes(attr)
    );

    queryOptions.attributes = modelAttributes.map((attr) => [
      sequelize.fn("MIN", sequelize.col(attr)),
      attr,
    ]);

    queryOptions.group = modelAttributes; // Group by all non-pk fields

    return queryOptions;
  }

  /**
   * @private
   *
   * Validate unique model keys to the passed in data object.
   * Assign them to a where clause object if they are present in the data object.
   *
   * @param {Object} dataObject - The object to compare to the model.
   * @returns {Object} the returned where clause.
   */
  #getUniqueKeys(dataObject) {
    const whereClause = {};

    const uniqueKeys = Object.keys(this.model.rawAttributes).filter(
      (key) => this.model.rawAttributes[key].unique
    );

    let foundKey = false;

    for (const uniqueKey of uniqueKeys) {
      if (dataObject[uniqueKey] !== undefined) {
        whereClause[uniqueKey] = dataObject[uniqueKey];
        foundKey = true;
        break;
      }
    }

    if (!foundKey) {
      throw new Error(
        "No unique key found in dataObject to identify the record to update."
      );
    }
    return whereClause;
  }

  /**
   * Connect to the DB.
   * @returns {Promise} - DB connection.
   */
  async connect() {
    return new Promise((resolve, reject) => {
      this.connection.connect((error) => {
        if (error) {
          console.error("Database connection failed:", err);
          reject(error);
        } else {
          console.log("Database connected!");
          resolve();
        }
      });
    });
  }

  /**
   * Creates a record in the relative table based on the calling service.
   *
   * @param {Object} dataObject - Object relative to the calling service.
   * @returns {Promise<Object>} - Resolves to an object representing the created record.
   */
  async createByQuery(dataObject) {
    try {
      return await this.model.create(dataObject);
    } catch (error) {
      this.#handleError(error);
    }
  }

  /**
   * Creates multiple records in the relative table based on the calling service.
   *
   * @param {Object[]} records - Array of Records to create.
   * @returns {Promise<Object[]>} - Resolves to an array of objects representing the created records.
   */
  async createMultipleByQuery(records) {
    try {
      // Insert all records at once, validate per record for security, skip hooks for performance.
      return await this.model.bulkCreate(records, {
        validate: true,
        individualHooks: false,
      });
    } catch (error) {
      this.#handleError(error);
    }
  }

  /**
   * Reads records dynamically for every table.
   *
   * It Can:
   * - Read all records.
   * - Read all records by grouping provided query fields.
   * - Read all unique records disregarding pk.
   * - Read all unique records by grouping provided query fields disregarding pk.
   *
   * @param {Object} dataObject - Object relative to the calling service.
   * @param {Boolean} uniqueFlag - Whether to return only unique values (disregarding pk).
   * @returns {Promise<Object>|<Object>[]} - Resolves to an array of objects or an object representing the data read.
   */
  async readByQuery(dataObject = {}, uniqueFlag = false) {
    try {
      let queryOptions = {};

      const whereClause = {};
      for (const [key, value] of Object.entries(dataObject)) {
        if (value !== null && value !== undefined) {
          whereClause[key] = value;
        }
      }
      queryOptions.where = whereClause;

      // Handle uniqueFlag.
      if (uniqueFlag) {
        queryOptions = this.#makeRecordsUnique(queryOptions);
      }

      // Fetch records based on dynamic query options.
      const mediaRecords = await this.model.findAll(queryOptions);

      return mediaRecords;
    } catch (error) {
      this.#handleError(error);
    }
  }

  /**
   * Update a record based on relative dataObject's properties and its unique keys.
   *
   * @param {Object} dataObject - Object containing properties for the update.
   * @returns {Promise<Object>} - Resolves to an object representing the updated record.
   */
  async updateByQuery(dataObject) {
    try {
      const whereClause = this.#getUniqueKeys(dataObject);

      return await this.model.update(dataObject, {
        validate: true,
        where: whereClause,
        returning: true,
      });
    } catch (error) {
      this.#handleError(error);
    }
  }

  /**
   * Delete a record from the DB based on unique keys in the model.
   *
   * @param {Number} uniqueKey - A key and value pair to identify the record to delete.
   * @returns {Promise<Number>} - Resolves to the number of records destroyed.
   * @throws An error object if the deletion fails.
   */
  async deleteByQuery(uniqueKey) {
    try {
      const whereClause = this.#getUniqueKeys(uniqueKey);

      return await this.model.destroy({
        where: whereClause
      });
    } catch (error) {
      this.#handleError(error);
    }
  }

  /**
   * Delete a multiple records from the DB based on unique keys in the model.
   * 
   * @param {Object[]} uniqueKeys - Array of Records to create.
   * @returns {Promise<Object>} - Resolves to an object representing the created record.
   */
  async deleteMultipleByQuery(uniqueKeys) {
    try {
      // Map each object in the uniqueKeys array to a where clause
      const whereClauses = uniqueKeys.map((uniqueKey) => this.#getUniqueKeys(uniqueKey));
  
      // Combine where clauses.
      const combinedWhereClause = {
        [Op.or]: whereClauses,
      };

      return await this.model.destroy({
        where: combinedWhereClause,
      });
  
    } catch (error) {
      this.#handleError(error);
    }
  }

  /**
   * Searches all fields in the model for values like the given characters.
   * @param {string} chars - The search term to look for in all fields.
   * @returns {Promise<Array<Object>>} - An array of matching records from the database.
   * @throws {Error} - Throws an error if the input is invalid or the query fails.
   */
  async autoComplete(chars) {
    try {
      let queryOptions = {};
      // Build WHERE clause: search all fields in LikeQueryFields for a Like match.
      const whereClause = {
        [Op.or]: this.autoCompleteQueryFields.map((field) => ({
          [field]: { [Op.like]: `%${chars}%` },
        })),
      };

      queryOptions.where = whereClause;
      queryOptions.limit = 10;
      queryOptions = this.#makeRecordsUnique(queryOptions);

      const results = await this.model.findAll(queryOptions);
      return results;
    } catch (error) {
      console.error("Error performing autocomplete search:", error);
      throw new Error("Error searching for records");
    }
  }

  /**
   * Closes the database connection.
   * @returns {Promise<void>} - Resolves when the connection is successfully closed.
   * @throws {Error} - Rejects with an error if the disconnection fails.
   */
  async disconnect() {
    return new Promise((resolve, reject) => {
      this.connection.end((err) => {
        if (err) {
          console.error("Error closing database connection:", err);
          reject(err);
        } else {
          console.log("Database connection closed");
          resolve();
        }
      });
    });
  }
}

module.exports = DbHandler;
