const {DbHandler} = require("../../../shared");
const MediaSubscriptionModel = require("./memberSubscriptionModel");

class MemberSubscriptionDbHandler extends DbHandler {
  constructor() {
    super("memberSubscription", "memberID", MediaSubscriptionModel);
  }
}

module.exports = MemberSubscriptionDbHandler;