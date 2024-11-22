const Object = require("../../../base-classes/object");

class PaymentObject extends Object {
  constructor() {
    super();
    this.paymentID = null;
    this.paymentType = null;
    this.paymentReason = null;
    this.date = null;
    this.memberID = null;
    this.price = null;
    this.employeeID = null;
  }
}

module.exports = PaymentObject;
