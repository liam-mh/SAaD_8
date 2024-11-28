const mysql = require("mysql2");
const sequelize = require("../../../config/sequelize");
const { Op, ValidationError, DatabaseError } = require("sequelize");

/**
 * Base entity class.
 * Dependency injection - relative table to access.
 */
class DbHandler {
  constructor(pk, model) {
    this.pk = pk;
    this.model = model;
  }

  // ------------------------------------- Error Handling -----------------------------------------------

  /**
   * @private
   * Handles errors by categorizing them and throwing appropriate messages.
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
   * Updates the query object to only return unique values by disregarding the pk.
   * Removes the primary key Attribute from the query.
   * Sets the remaining model attributes to only return the min value.
   * 
   * @param {Object} queryOptions - The current query options Object.
   * @returns {Object} - An updated query object that will only retun unique values.
   */
  #makeUnique(queryOptions){
    const modelAttributes = Object.keys(this.model.getAttributes()).filter(
      (attr) => attr !== this.model.primaryKeyAttribute
    );

    queryOptions.attributes = modelAttributes.map((attr) => [
      sequelize.fn("MIN", sequelize.col(attr)),
      attr,
    ]);

    queryOptions.group = modelAttributes; // Group by all non-pk fields

    return queryOptions;
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
   * Creates a record in the relative table based on injected dependency.
   *
   * @param {Object} dataObject - Object relative to the calling service.
   * @returns {Promise<Object>} - Resolves to an object representing the created record.
   */
  async createByQuery(dataObject) {
    try {
      const dbInsert = await this.model.create(dataObject);
      return dbInsert;
    } catch (error) {
      this.#handleError(error);
    }
  }

  /**
   * Creates multiple records in the relative table based on dependency injection.
   * @param {Object[]} records - Array of Records to create.
   * @returns {Promise<Object[]>} - Array of Created Records.
   */
  async createMultipleByQuery(records) {
    try {
      // Insert all records at once, validate per record for security, skip hooks for performance.
      const createdRecords = await this.model.bulkCreate(records, {
        validate: true,
        individualHooks: false,
      });

      return createdRecords;
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
   * @param {Object} dataObject - Object relative to the calling service. Objects non null properties represent query fields.
   * @param {Boolean} uniqueFlag - Whether to return only unique values (disregarding pk).
   * @returns {Promise<Object>} - Resolves to an object representing the returned data.
   */
  async readByQuery(dataObject = {}, uniqueFlag = false) {
    if (!this.model) {
      throw new Error(`Model for table '${this.model.tableName}' not found.`);
    }

    try {
      let queryOptions = {};

      // Build the where clause dynamically
      const whereClause = {};
      for (const [key, value] of Object.entries(dataObject)) {
        if (value !== null && value !== undefined) {
          whereClause[key] = value;
        }
      }
      queryOptions.where = whereClause;

      // Handle uniqueFlag
      if (uniqueFlag) {
         queryOptions = this.#makeUnique(queryOptions);     
      }

      // Fetch records based on query options
      return await this.model.findAll(queryOptions);
    } catch (error) {
      this.#handleError(error);
    }
  }

  
  /**
   * Update a record based on relative dataObject's properties and its unique keys.
   * @param {Object} dataObject - Object containing properties for the update.
   * @returns {Promise<[number, Object[]?]>} - Resolves to an array:
   *  - The first element is the number of rows affected.
   *  - The second element is an array of the updated records (if `returning` is enabled).
   */
  async updateByQuery(dataObject) {
    try {

      // Retrieve unique keys from the model
      const uniqueKeys = Object.keys(this.model.rawAttributes).filter(
        (key) => this.model.rawAttributes[key].unique
      );

      // Find the unique key and its value in the dataObject.
      const whereClause = {};
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

      const dbUpdate = await this.model.update(dataObject, {
        validate: true,
        where: whereClause,
        returning: true, 
      });

      return dbUpdate;
    } catch (error) {
      this.#handleError(error);
    }
  }

  //!!!check this <-------
  /**
   * Delete a record from the DB.
   * @param {Number} primaryKey - Identifier of record to delete.
   * @returns {Promise<Number>} - Resolves with the number of records deleted (0 if no records were found).
   * Rejects with an error object if the deletion fails.
   */
  async deleteByQuery(primaryKey) {
    if (!this.model) {
      throw new Error(`Model for table '${this.model.tableName}' not found.`);
    }

    try {
      const deleteResult = await this.model.destroy({
        where: {
          [this.pk]: primaryKey,
        },
      });

      if (deleteResult === 0) {
        console.warn(
          "No records found to delete. Check the primary key value."
        );
      } else {
        console.log("Data deleted successfully");
      }

      return deleteResult; // Return the number of records deleted
    } catch (err) {
      console.error("Error deleting data:", err);
      throw new Error("Failed to delete record: " + err.message);
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
      queryOptions.limit =10;
      queryOptions = this.#makeUnique(queryOptions);

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
