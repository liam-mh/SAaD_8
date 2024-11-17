const Service = require("../../../base-classes/service");
const PaymentDbHandler = require("./paymentDbHandler");
const PaymentObject = require("./paymentObject");

class PaymentService extends Service {
  constructor() {
    const dbHandler = new PaymentDbHandler();
    const object = new PaymentObject();
    super(dbHandler, object);
  }
}

module.exports = PaymentService;