const {Object} = require("../../../shared");
class MemberSubscriptionObject extends Object {
  constructor() {
    super();
    this.MemberID = null;
    this.SubscriptionID = null;
    this.SubscriptionDate = null;
    this.RemainingTokens = null;
    this.OverdueDebt = null;
  }
}

module.exports = MemberSubscriptionObject;
