const {DbHandler} = require("shared");
const MediaModel = require("./mediaModel")

class MediaDbHandler extends DbHandler{
    constructor(){
        super("Media", "MediaID", MediaModel);
    }
}

module.exports = MediaDbHandler;