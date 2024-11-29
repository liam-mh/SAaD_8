const {Service} = require("../../../shared");
const MemberSubscriptionDbHandler = require("./memberSubscriptionDbHandler");

/**
 * Service for member Subscription related requests.
 * Injects its database handler as a dependency into its base class.
 */
class MemberSubscriptionService extends Service {
  constructor() {
    const dbHandler = new MemberSubscriptionDbHandler();
    super(dbHandler);
  }
}

module.exports = MemberSubscriptionService;