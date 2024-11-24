const {DbHandler} = require("../../../shared");

class MemberSubscriptionDbHandler extends DbHandler {
  constructor() {
    super("memberSubscription", "memberID");
  }
}

module.exports = MemberSubscriptionDbHandler;