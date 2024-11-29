const {DbHandler} = require("../../../shared");
const MemberSubscriptionModel = require("./memberSubscriptionModel");

/**
 * Database handler for member Subscription related requests.
 * Injects its model as a dependency into its base class.
 */
class MemberSubscriptionDbHandler extends DbHandler {
  constructor() {
    super(MemberSubscriptionModel);
  }
}

module.exports = MemberSubscriptionDbHandler;