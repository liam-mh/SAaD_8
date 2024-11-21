const Object = require("../../../base-classes/object");

class MemberObject extends Object {
  constructor() {
    super();
    this.memberID = null;
    this.firstName = null;
    this.surname = null;
    this.email = null;
    this.firstLineAddress = null;
    this.city = null;
    this.postcode = null;
    this.branchID = null;
    this.registerDate = null;
  }
}

module.exports = MemberObject;
