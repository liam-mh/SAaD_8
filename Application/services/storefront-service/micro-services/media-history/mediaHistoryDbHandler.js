const {DbHandler} = require("shared");
const MediaHistoryModel = require("./mediaHistoryModel");

class MediaHistoryDbHandler extends DbHandler{
    constructor(){
        super("MediaHistory", "HistoryID", MediaHistoryModel);
    }
}

module.exports = MediaHistoryDbHandler;