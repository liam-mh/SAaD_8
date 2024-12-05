const {DbHandler} = require("../../../shared");
const MemberModel = require("./memberModel")

/**
 * Database handler for member related requests.
 * Injects its model as a dependency into its base class.
 */
class MemberDbHandler extends DbHandler {
  constructor() {
    const removeFromGrouping = ['Password'];
    super(MemberModel, removeFromGrouping);
  }
}

module.exports = MemberDbHandler;
