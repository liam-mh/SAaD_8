const {DbHandler} = require("../../../shared");
const SubscriptionModel = require("./subscriptionModel");

/**
 * Database handler for subscription related requests.
 * Injects its model as a dependency into its base class.
 */
class SubscriptionDbHandler extends DbHandler {
  constructor() {
    super(SubscriptionModel);
  }
}

module.exports = SubscriptionDbHandler;