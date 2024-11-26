const {Object} = require("shared");

class MediaObject extends Object{
    constructor(){
        super();
        this.MediaID = null;
        this.Title = null;
        this.Type = null; 
        this.Description = null;
        this.PublishDate = null;
        this.Author = null;
        this.Genre = null; 
        this.BranchID = null;
    }
}

module.exports = MediaObject;