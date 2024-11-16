const Controller = require("../../../base-classes/controller");
const SubscriptionService = require("./subscriptionService");

/**
 * Controller for subscription related requests.
 * Injects its service dependency into the controller base class.
 */
class SubscriptionController extends Controller {
  constructor() {
    const service = new SubscriptionService();
    super(service); // Pass the specific service to the base class
  }
}

module.exports = SubscriptionController;
