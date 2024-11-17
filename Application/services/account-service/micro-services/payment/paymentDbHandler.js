const DbHandler = require("../../../base-classes/dbHandler");

class PaymentDbHandler extends DbHandler {
  constructor() {
    super("payment", "paymentID");
  }
}

module.exports = PaymentDbHandler;