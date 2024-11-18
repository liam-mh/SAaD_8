const DbHandler = require("../../../base-classes/dbHandler");

class MediaDbHandler extends DbHandler{
    constructor(){
        super("media", "mediaID");
    }
}

module.exports = MediaDbHandler;