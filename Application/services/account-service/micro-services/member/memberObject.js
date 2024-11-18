const AbstractObject = require("../../../base-classes/abstractObject");

class MemberObject extends AbstractObject {
  constructor() {
    super();
    this.memberID = null;
    this.firstName = null;
    this.surname = null;
    this.email = null;
    this.firstLineAddress = null;
    this.city = null;
    this.postcode = null;
    this.branchID = null;
    this.registerDate = null;
  }

  /**
   * @override
   * @param {Array} arr - array to create a member object from.
   */
  createObjectFromArray(arr) {
    // Check if array has the expected length to assign to properties.
    if (arr.length !== 9) {
      throw new Error("Array must have exactly 9 elements.");
    }

    // Assign each element in the array to the respective property.
    [
      this.employeeID,
      this.firstName,
      this.surname,
      this.email,
      this.firstLineAddress,
      this.city,
      this.postcode,
      this.branchID,
      this.registerDate
      ,
    ] = arr;
  }
}

module.exports = MemberObject;
