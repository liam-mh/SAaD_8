const {Object} = require("shared");

class newMediaRequestObject extends Object {
  constructor() {
    super();
    this.RequestID = null;
    this.Title = null;
    this.Type = null; 
    this.Reason = null;
    this.Date = null;
    this.MemberID = null;
  }
}

module.exports = newMediaRequestObject;
