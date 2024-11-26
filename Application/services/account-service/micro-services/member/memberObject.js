const {Object} = require("../../../shared");

class MemberObject extends Object {
  constructor() {
    super();
    this.MemberID = null;
    this.FirstName = null;
    this.Surname = null;
    this.Email = null;
    this.Password = null;
    this.FirstLineAddress = null;
    this.City = null;
    this.Postcode = null;
    this.BranchID = null;
    this.RegisterDate = null;
  }
}

module.exports = MemberObject;
