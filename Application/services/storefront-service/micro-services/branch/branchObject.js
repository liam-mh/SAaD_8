const AbstractObject = require("../../../base-classes/abstractObject");

class BranchObject extends AbstractObject{
    constructor(){
        super();
        this.branchID = null;
        this.firstLineAddress = null;
        this.poscode = null;
        this.city = null;
        this.openingHours = null;
    }
    
    /**
     * @override
     * @param {Array} arr - array to create a branch object from.
     */
    createObjectFromArray(arr) {
        // Check if array has the expected length to assign to properties.
        if (arr.length !== 5) {
        throw new Error("Array must have exactly 5 elements.");
        }

        // Assign each element in the array to the respective property.
        [
            this.branchID,
            this.firstLineAddress,
            this.poscode,
            this.city,
            this.openingHours 
        ] = arr;
    }
}

module.exports = BranchObject;