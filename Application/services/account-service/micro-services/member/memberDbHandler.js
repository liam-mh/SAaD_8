const {DbHandler} = require("../../../shared");
const MemberModel = require("./memberModel")

class MemberDbHandler extends DbHandler {
  constructor() {
    super("Member", "MemberID", MemberModel);
  }
}

module.exports = MemberDbHandler;
