const AbstractObject = require("../../../base-classes/abstractObject");

class MediaObject extends AbstractObject{
    constructor(){
        this.mediaID = null;
        this.type = null;
        this.description = null;
        this.publishDate = null;
        this.author = null;
        this.genre = null;
        this.branchID = null;
    }
    
    /**
     * @override
     * @param {Array} arr - array to create a media object from.
     */
    createObjectFromArray(arr) {
        // Check if array has the expected length to assign to properties.
        if (arr.length !== 7) {
        throw new Error("Array must have exactly 7 elements.");
        }

        // Assign each element in the array to the respective property.
        [
            this.mediaID,
            this.type,
            this.description,
            this.publishDate,
            this.author,
            this.genre,
            this.branchID
        ] = arr;
    }
}

module.exports = MediaObject;