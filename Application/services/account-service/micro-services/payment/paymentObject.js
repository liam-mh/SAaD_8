const AbstractObject = require("../../../base-classes/abstractObject");

class PaymentObject extends AbstractObject {
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

  /**
   * @override
   * @param {Array} arr - array to create a payment object from.
   */
  createObjectFromArray(arr) {
    // Check if array has the expected length to assign to properties.
    if (arr.length !== 6) {
      throw new Error("Array must have exactly 6 elements.");
    }

    // Assign each element in the array to the respective property.
    [
      this.paymentID,
      this.paymentType,
      this.paymentReason,
      this.date,
      this.memberID,
      this.price,
      this.employeeID,
    ] = arr;
  }
}

module.exports = PaymentObject;
