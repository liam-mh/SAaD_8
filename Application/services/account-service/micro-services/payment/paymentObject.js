const {Object} = require("../../../shared");

class PaymentObject extends Object {
  constructor() {
    super();
    this.PaymentID = null;
    this.PaymentType = null;
    this.PaymentReason = null;
    this.Date = null;
    this.MemberID = null;
    this.Price = null;
    this.EmployeeID = null;
  }
}

module.exports = PaymentObject;
