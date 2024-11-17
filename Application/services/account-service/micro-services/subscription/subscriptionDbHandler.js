const DbHandler = require("../../../base-classes/dbHandler");

class SubscriptionDbHandler extends DbHandler {
  constructor() {
    super("subscription", "subscriptionID");
  }
}

module.exports = SubscriptionDbHandler;