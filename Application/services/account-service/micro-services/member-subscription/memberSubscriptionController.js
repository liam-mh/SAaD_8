const Controller = require("../../../base-classes/controller");
const MemberSubscriptionService = require("./memberSubscriptionService");

/**
 * Controller for member Subscription related requests.
 * Injects its service dependency into the controller base class.
 */
class MemberSubscriptionController extends Controller {
  constructor() {
    const service = new MemberSubscriptionService();
    super(service); // Pass the specific service to the base class
  }
}

module.exports = MemberSubscriptionController;
