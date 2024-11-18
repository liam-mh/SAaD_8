const DbHandler = require("../../../base-classes/dbHandler");

class EmployeeDbHandler extends DbHandler {
  constructor() {
    super("employee", "employeeID");
  }
}

module.exports = EmployeeDbHandler;