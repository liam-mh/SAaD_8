const {DbHandler} = require("../../../shared");
const EmployeeModel = require("./employeeModel");

class EmployeeDbHandler extends DbHandler {
  constructor() {
    super("Employee", "EmployeeID", EmployeeModel);
  }
}

module.exports = EmployeeDbHandler;