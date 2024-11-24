const {DbHandler} = require("../../../shared");

class MemberDbHandler extends DbHandler {
  constructor() {
    super("Member", "MemberID");
  }
}

module.exports = MemberDbHandler;
