const {DbHandler} = require("../../../shared");
const SubscriptionModel = require("./subscriptionModel");

class SubscriptionDbHandler extends DbHandler {
  constructor() {
    super("Subscription", "SubscriptionID", SubscriptionModel);
  }
}

module.exports = SubscriptionDbHandler;