const {DbHandler} = require("../../../shared");

class EmployeeDbHandler extends DbHandler {
  constructor() {
    super("employee", "employeeID");
  }
}

module.exports = EmployeeDbHandler;