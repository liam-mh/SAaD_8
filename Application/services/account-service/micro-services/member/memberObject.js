const AbstractObject = require("../../../base-classes/abstractObject");

class MemberObject extends AbstractObject {
  constructor() {
    super();
    this.MemberID = null;
    this.FirstName = null;
    this.Surname = null;
    this.Email = null;
    this.Password = null;
    this.FirstLineAddress = null;
    this.City = null;
    this.Postcode = null;
    this.BranchID = null;
    this.RegisterDate = null;
  }

  /**
   * @override
   * @param {Array} arr - array to create a member object from.
   */
  createObjectFromArray(arr) {
    // Check if array has the expected length to assign to properties.
    if (arr.length !== 10) {
      throw new Error("Array must have exactly 10 elements.");
    }

    // Assign each element in the array to the respective property.
    [
      this.MemberID,
      this.FirstName,
      this.Surname,
      this.Email,
      this.Password,
      this.FirstLineAddress,
      this.City,
      this.Postcode,
      this.BranchID,
      this.RegisterDate
      ,
    ] = arr;
  }
}

module.exports = MemberObject;
