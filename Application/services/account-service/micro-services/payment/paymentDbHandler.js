const {DbHandler} = require("../../../shared");
const PaymentModel = require("./paymentModel");

/**
 * Database handler for payment related requests.
 * Injects its model as a dependency into its base class.
 * 
 * @author Guy Nicklin
 */
class PaymentDbHandler extends DbHandler {
  constructor() {
    super(PaymentModel);
  }
}

module.exports = PaymentDbHandler;