const {Controller} = require("../../../shared");
const PaymentService = require("./paymentService");

class PaymentController extends Controller {
    constructor() {
        const service = new PaymentService();
        super(service); // Pass the specific service to the base class
      }
}

module.exports = PaymentController;