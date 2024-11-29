const {Controller} = require("../../../shared");
const PaymentService = require("./paymentService");

/**
 * Controller for payment related requests.
 * Injects its service as a dependency into its base class.
 */
class PaymentController extends Controller {
    constructor() {
        const service = new PaymentService();
        super(service); 
      }
}

module.exports = PaymentController;