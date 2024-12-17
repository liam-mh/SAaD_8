const {Service} = require("shared");
const SubscriptionDbHandler = require("../subscription/subscriptionDbHandler");

/**
 * Service for subscription related requests.
 * Injects its database handler as a dependency into its base class.
 * 
 * @author Guy Nicklin
 */
class SubscriptionService extends Service {
  constructor() {
    const dbHandler = new SubscriptionDbHandler();
    super(dbHandler);
  }
}

module.exports = SubscriptionService;
