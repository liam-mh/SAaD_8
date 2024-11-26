const {DbHandler} = require("../../../shared");
const SubscriptionModel = require("./subscriptionModel");

class SubscriptionDbHandler extends DbHandler {
  constructor() {
    super("SubscriptionID", SubscriptionModel);
  }
}

module.exports = SubscriptionDbHandler;