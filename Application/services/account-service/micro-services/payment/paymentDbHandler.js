const {DbHandler} = require("../../../shared");
const PaymentModel = require("./paymentModel");

class PaymentDbHandler extends DbHandler {
  constructor() {
    super("PaymentID", PaymentModel);
  }
}

module.exports = PaymentDbHandler;