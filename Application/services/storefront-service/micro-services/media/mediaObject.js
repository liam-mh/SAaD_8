const {Object} = require("../../../shared");

class MediaObject extends Object{
    constructor(){
        super();
        this.mediaID = null;
        this.title = null;
        this.type = null;
        this.description = null;
        this.publishDate = null;
        this.author = null;
        this.genre = null;
        this.branchID = null;
    }
}

module.exports = MediaObject;