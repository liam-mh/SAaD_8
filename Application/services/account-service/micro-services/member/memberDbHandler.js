const DbHandler = require("../../../base-classes/dbHandler");

class MemberDbHandler extends DbHandler {
  constructor() {
    super("Member", "MemberID");
  }
}

module.exports = MemberDbHandler;
