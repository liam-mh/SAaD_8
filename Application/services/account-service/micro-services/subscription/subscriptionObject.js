const {Object} = require("../../../shared");

class SubscriptionObject extends Object {
  constructor() {
    super();
    this.SubscriptionID = null;
    this.TokenQuantity = null;
    this.PricePerMonth = null;
    this.OverduePricePerDay = null;
  }
}

module.exports = SubscriptionObject;
