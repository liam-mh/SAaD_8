const AbstractObject = require("../../../base-classes/abstractObject");

class EmployeeObject extends AbstractObject {
  constructor() {
    super();
    this.employeeID = null;
    this.firstName = null;
    this.surname = null;
    this.email = null;
    this.firstLineAddress = null;
    this.city = null;
    this.postcode = null;
    this.branchID = null;
    this.role = null;
  }

  /**
   * @override
   * @param {Array} arr - array to create a employee object from.
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
      this.role,
    ] = arr;
  }
}

module.exports = EmployeeObject;