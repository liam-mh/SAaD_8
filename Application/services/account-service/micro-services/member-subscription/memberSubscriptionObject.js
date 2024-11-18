const AbstractObject = require("../../../base-classes/abstractObject");

class MemberSubscriptionObject extends AbstractObject {
  constructor() {
    super();
    this.memberID = null;
    this.subscriptionID = null;
    this.subscriptionDate = null;
    this.remainingTokens = null;
    this.overdueDebt = null;
  }

  /**
   * @override
   * @param {Array} arr - array to create a member subscription object from.
   */
  createObjectFromArray(arr) {
    // Check if array has the expected length to assign to properties.
    if (arr.length !== 5) {
      throw new Error("Array must have exactly 5 elements.");
    }

    // Assign each element in the array to the respective property.
    [
        this.memberID,
        this.subscriptionID,
        this.subscriptionDate,
        this.remainingTokens,
        this.overdueDebt
    ] = arr;
  }
}

module.exports = MemberSubscriptionObject;
