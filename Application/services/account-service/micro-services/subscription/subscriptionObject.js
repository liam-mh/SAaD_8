const {Object} = require("../../../shared");

class SubscriptionObject extends Object {
  constructor() {
    super();
    this.subscriptionID = null;
    this.tokenQuantity = null;
    this.pricePerMonth = null;
    this.overduePricePerDay = null;
  }
}

module.exports = SubscriptionObject;
