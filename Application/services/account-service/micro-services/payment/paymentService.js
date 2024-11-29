const {Service} = require("../../../shared");
const PaymentDbHandler = require("./paymentDbHandler");

/**
 * Service for payment related requests.
 * Injects its database handler as a dependency into its base class.
 */
class PaymentService extends Service {
  constructor() {
    const dbHandler = new PaymentDbHandler();
    super(dbHandler);
  }
}

module.exports = PaymentService;