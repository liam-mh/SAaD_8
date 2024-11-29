const {DbHandler} = require("../../../shared");
const EmployeeModel = require("./employeeModel");

/**
 * Controller for employee related requests.
 * Injects its model as a dependency into its base class.
 */
class EmployeeDbHandler extends DbHandler {
  constructor() {
    super(EmployeeModel);
  }
}

module.exports = EmployeeDbHandler;