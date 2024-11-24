const {DbHandler} = require("../../../shared");
const SubscriptionModel = require("./subscriptionModel");

class SubscriptionDbHandler extends DbHandler {
  constructor() {
    super("subscription", "subscriptionID", SubscriptionModel);
  }
}

module.exports = SubscriptionDbHandler;