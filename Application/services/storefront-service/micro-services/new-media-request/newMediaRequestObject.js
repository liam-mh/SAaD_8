const Object = require("../../../base-classes/object");

class newMediaRequestObject extends Object {
  constructor() {
    super();
    this.requestID = null;
    this.title = null;
    this.type = null;
    this.reason = null;
    this.date = null;
    this.memberID = null;
  }
}

module.exports = newMediaRequestObject;
