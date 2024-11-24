const {DbHandler} = require("../../../shared");
const EmployeeModel = require("./employeeModel");

class EmployeeDbHandler extends DbHandler {
  constructor() {
    super("employee", "employeeID", EmployeeModel);
  }
}

module.exports = EmployeeDbHandler;