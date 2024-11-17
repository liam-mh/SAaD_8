const AbstractObject = require("../../../base-classes/abstractObject");

class newMediaRequestObject extends AbstractObject {
  constructor() {
    super();
    this.requestID = null;
    this.title = null;
    this.type = null;
    this.reason = null;
    this.date = null;
    this.memberID = null;
  }

  /**
   * @override
   * @param {Array} arr - array to create a new media request object from.
   */
  createObjectFromArray(arr) {
    // Check if array has the expected length to assign to properties.
    if (arr.length !== 6) {
      throw new Error("Array must have exactly 6 elements.");
    }

    // Assign each element in the array to the respective property.
    [
      this.requestID,
      this.title,
      this.type,
      this.reason,
      this.date,
      this.memberID,
    ] = arr;
  }
}

module.exports = newMediaRequestObject;
