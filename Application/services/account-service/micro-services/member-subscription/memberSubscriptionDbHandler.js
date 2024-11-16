const DbHandler = require("../../../base-classes/dbHandler");

class MemberSubscriptionDbHandler extends DbHandler {
  constructor() {
    super("memberSubscription", "memberID");
  }
}

module.exports = MemberSubscriptionDbHandler;