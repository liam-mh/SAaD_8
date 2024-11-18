const AbstractObject = require("../../../base-classes/abstractObject");

class WishlistObject extends AbstractObject{
    constructor(){
        super();
        this.wishlistID = null;
        this.memberID = null;
        this.title = null;
        this.type = null;
        this.dateTime = null;
        this.widhType = null;
    }
    
    /**
     * @override
     * @param {Array} arr - array to create a wishlist object from.
     */
    createObjectFromArray(arr) {
        // Check if array has the expected length to assign to properties.
        if (arr.length !== 6) {
        throw new Error("Array must have exactly 6 elements.");
        }

        // Assign each element in the array to the respective property.
        [
            this.wishlistID,
            this.memberID,
            this.title,
            this.type,
            this.dateTime,
            this.widhType
        ] = arr;
    }
}

module.exports = WishlistObject;