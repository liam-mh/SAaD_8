const {DbHandler} = require("shared");

class MediaDbHandler extends DbHandler{
    constructor(){
        super("media", "mediaID");
    }
}

module.exports = MediaDbHandler;