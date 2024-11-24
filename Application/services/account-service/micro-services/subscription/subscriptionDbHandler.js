const {DbHandler} = require("../../../shared");

class SubscriptionDbHandler extends DbHandler {
  constructor() {
    super("subscription", "subscriptionID");
  }
}

module.exports = SubscriptionDbHandler;