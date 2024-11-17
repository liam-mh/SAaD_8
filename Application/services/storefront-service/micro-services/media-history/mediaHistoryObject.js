const AbstractObject = require("../../../base-classes/abstractObject");

class MediaHistoryObject extends AbstractObject{
    constructor(){
        super();
        this.historyID = null;
        this.mediaID = null;
        this.branchID = null;
        this.employeeID = null;
        this.active = null;
        this.rentStart = null;
        this.rentEnd = null;
        this.actualReturn = null;
    }
    
    /**
     * @override
     * @param {Array} arr - array to create a media history object from.
     */
    createObjectFromArray(arr) {
        // Check if array has the expected length to assign to properties.
        if (arr.length !== 8) {
        throw new Error("Array must have exactly 8 elements.");
        }

        // Assign each element in the array to the respective property.
        [
            this.historyID,
            this.mediaID,
            this.branchID,
            this.employeeID,
            this.active,
            this.rentStart,
            this.rentEnd,
            this.actualReturn,
        ] = arr;
    }
}

module.exports = MediaHistoryObject;