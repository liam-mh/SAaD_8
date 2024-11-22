const Object = require("../../../base-classes/object");

class EmployeeObject extends Object {
  constructor() {
    super();
    this.employeeID = null;
    this.firstName = null;
    this.surname = null;
    this.email = null;
    this.firstLineAddress = null;
    this.city = null;
    this.postcode = null;
    this.branchID = null;
    this.role = null;
  }
}

module.exports = EmployeeObject;
