const {Object} = require("shared");

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
