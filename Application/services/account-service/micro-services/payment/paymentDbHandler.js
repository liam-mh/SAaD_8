const {DbHandler} = require("../../../shared");
const PaymentModel = require("./paymentModel");

class PaymentDbHandler extends DbHandler {
  constructor() {
    super("payment", "paymentID", PaymentModel);
  }
}

module.exports = PaymentDbHandler;