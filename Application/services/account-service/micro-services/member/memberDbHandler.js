const DbHandler = require("../../../base-classes/dbHandler");

class MemberDbHandler extends DbHandler {
  constructor() {
    super("member", "memberID");
  }
}

module.exports = MemberDbHandler;
