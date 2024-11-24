const {Service} = require("shared");
const SubscriptionDbHandler = require("../subscription/subscriptionDbHandler");
const SubsciptionObject = require("./subscriptionObject")

class SubscriptionService extends Service {
  constructor() {
    const dbHandler = new SubscriptionDbHandler();
    const object = new SubsciptionObject();
    super(dbHandler, object);
  }
}

module.exports = SubscriptionService;
