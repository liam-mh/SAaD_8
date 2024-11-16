const AbstractObject = require("../../../base-classes/abstractObject");

class SubscriptionObject extends AbstractObject {
  constructor() {
    super();
    this.subscriptionID = null;
    this.tokenQuantity = null;
    this.pricePerMonth = null;
    this.overduePricePerDay = null;
  }

  /**
   * @override
   * @param {Array} arr - array to create a subscription object from.
   */
  createObjectFromArray(arr) {
    // Check if array has the expected length to assign to properties.
    if (arr.length !== 4) {
      throw new Error("Array must have exactly 4 elements.");
    }

    // Assign each element in the array to the respective property.
    [
      this.subscriptionID,
      this.tokenQuantity,
      this.pricePerMonth,
      this.overduePricePerDay
    ] = arr;
  }
}

module.exports = SubscriptionObject;
