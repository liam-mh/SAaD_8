const {Controller} = require("../../../shared");
const SubscriptionService = require("./subscriptionService");

/**
 * Controller for subscription related requests.
 * Injects its service as a dependency into its base class.
 * 
 * @author Guy Nicklin
 */
class SubscriptionController extends Controller {
  constructor() {
    const service = new SubscriptionService();
    super(service); 
  }
}

module.exports = SubscriptionController;
