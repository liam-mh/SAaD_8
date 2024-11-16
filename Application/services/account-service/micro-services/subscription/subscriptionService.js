const Service = require("../../../base-classes/service");
const SubscriptionDbHandler = require("../member/memberDbHandler");
const SubsciptionObject = require("./subscriptionObject")

class SubscriptionService extends Service {
  constructor() {
    const dbHandler = new SubscriptionDbHandler();
    const object = new SubsciptionObject();
    super(dbHandler, object);
  }
}

module.exports = SubscriptionService;
