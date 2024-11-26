const {Object} = require("../../../shared");

class EmployeeObject extends Object {
  constructor() {
    super();
    this.EmployeeID = null;
    this.FirstName = null;
    this.Surname = null;
    this.Email = null;
    this.Password = null;
    this.FirstLineAddress = null;
    this.City = null;
    this.Postcode = null;
    this.BranchID = null;
    this.Role = null;
  }
}

module.exports = EmployeeObject;
