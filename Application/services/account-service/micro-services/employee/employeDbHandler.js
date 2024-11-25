const {DbHandler} = require("../../../shared");
const EmployeeModel = require("./employeeModel");

class EmployeeDbHandler extends DbHandler {
  constructor() {
    super("EmployeeID", EmployeeModel);
  }
}

module.exports = EmployeeDbHandler;