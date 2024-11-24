const {DbHandler} = require("../../../shared");
const MediaSubscriptionModel = require("./memberSubscriptionModel");

class MemberSubscriptionDbHandler extends DbHandler {
  constructor() {
    super("MemberSubscription", "MemberID", MediaSubscriptionModel);
  }
}

module.exports = MemberSubscriptionDbHandler;