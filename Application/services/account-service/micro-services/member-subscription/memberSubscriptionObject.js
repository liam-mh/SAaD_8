const Object = require("../../../base-classes/object");

class MemberSubscriptionObject extends Object {
  constructor() {
    super();
    this.memberID = null;
    this.subscriptionID = null;
    this.subscriptionDate = null;
    this.remainingTokens = null;
    this.overdueDebt = null;
  }
}

module.exports = MemberSubscriptionObject;
