const {DbHandler} = require("../../../shared");

class PaymentDbHandler extends DbHandler {
  constructor() {
    super("payment", "paymentID");
  }
}

module.exports = PaymentDbHandler;