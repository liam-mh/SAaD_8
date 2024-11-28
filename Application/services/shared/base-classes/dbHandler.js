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

  // ------------------------------------- Validation methods -----------------------------------------------

  /**
   * Connect to the DB.
   * @returns Promise - DB connection.
   */
  async connect() {
    return new Promise((resolve, reject) => {
      this.connection.connect((err) => {
        if (err) {
          console.error("Database connection failed:", err);
          reject(err);
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
  }

  /**
   * Creates multiple records in the relative table based on dependency injection.
   * @param {Object[]} records - Array of Records to create.
   * @returns {Promise<Object[]>} - Array of Created Records.
   */
  async createMultipleByQuery(records) {
    try {

      console.log(records);
      // Insert all records at once, validate per record for security, skip hooks for performance.
      const createdRecords = await this.model.bulkCreate(records, {
        validate: true, 
        individualHooks: false, 
      });

      return createdRecords;

    } catch (error) {
      
      // Error handlin when validating against the model.
      if (error instanceof ValidationError) {
        console.error("Validation Error: ", error.errors);
        throw new Error(
          "Validation failed. Check the input data for each record."
        );
      }
      
      // Error handling when interacting with the DB.
      if (error instanceof DatabaseError) {
        console.error("Database Error: ", error.message);
        throw new Error(
          "A database error occurred while inserting multiple records."
        );
      }

      console.error("Unexpected Error: ", error.message);
      throw new Error("An unexpected error occurred: " + error.message);
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
      const queryOptions = {};

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
        const modelAttributes = Object.keys(this.model.getAttributes()).filter(
          (attr) => attr !== this.model.primaryKeyAttribute
        );

        queryOptions.attributes = modelAttributes.map((attr) => [
          sequelize.fn("MIN", sequelize.col(attr)),
          attr,
        ]);

        queryOptions.group = modelAttributes; // Group by all non-pk fields
      }

      // Fetch records based on query options
      return await this.model.findAll(queryOptions);
    } catch (error) {
      console.error("Error reading records:", error.message);
      throw new Error("An error occurred while reading records.");
    }
  }

  //!!!check this <-----
  /**
   * Update a record based on relative dataObjects properties.
   * @param {Object} dataObject - relative object based on calling service.
   * @returns {Promise<[number, Object[]?]>} - Resolves to an array:
   *  - The first element is the number of rows affected.
   *  - The second element is an array of the updated records.
   */
  async updateByQuery(dataObject) {
    if (!this.model) {
      throw new Error(`Model for table '${this.model.tableName}' not found.`);
    }
    // Extract the primary key value from the data object.
    const pkValue = dataObject[this.pk];

    const updateData = { ...dataObject };
    if (Object.keys(updateData).length === 0) {
      throw new Error("No valid data provided for update.");
    }
    delete updateData.this.pk;

    // Only include non-null and defined fields
    const filteredUpdateData = {};
    for (const [key, value] of Object.entries(updateData)) {
      if (value !== null && value !== undefined) {
        filteredUpdateData[key] = value;
      }
    }

    try {
      const dbUpdate = await this.model.update(filteredUpdateData, {
        where: {
          [this.pk]: pkValue,
        },
      });
      return dbUpdate;
    } catch (error) {
      if (error instanceof ValidationError) {
        console.error("Validation Error: ", error.errors);
        throw new Error("Validation failed. Check your input data.");
      }

      if (error instanceof DatabaseError) {
        console.error("Database Error: ", error.message);
        throw new Error("A database error occurred. Please try again later.");
      }

      // Other errors
      console.error("Unexpected Error: ", error.message);
      throw new Error("An unexpected error occurred: " + error.message);
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
      // Build WHERE clause: search all fields in LikeQueryFields for a Like match.
      const whereClause = {
        [Op.or]: this.autoCompleteQueryFields.map((field) => ({
          [field]: { [Op.like]: `%${chars}%` },
        })),
      };

      const results = await this.model.findAll({
        where: whereClause,
        limit: 10, // Limit the number of results
      });

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
