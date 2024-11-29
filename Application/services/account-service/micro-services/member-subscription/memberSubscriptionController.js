const {Controller} = require("../../../shared");
const MemberSubscriptionService = require("./memberSubscriptionService");

/**
 * Controller for member Subscription related requests.
 * Injects its service as a dependency into its base class.
 */
class MemberSubscriptionController extends Controller {
  constructor() {
    const service = new MemberSubscriptionService();
    super(service); 
  }
}

module.exports = MemberSubscriptionController;
