const Object = require("../../../base-classes/object");

class MediaObject extends Object{
    constructor(){
        super();
        this.mediaID = null;
        this.type = null;
        this.description = null;
        this.publishDate = null;
        this.author = null;
        this.genre = null;
        this.branchID = null;
    }
}

module.exports = MediaObject;