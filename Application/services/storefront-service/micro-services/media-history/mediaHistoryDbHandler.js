const {DbHandler} = require("shared");
const MediaHistoryModel = require("./mediaHistoryModel");

class MediaHistoryDbHandler extends DbHandler{
    constructor(){
        super("mediaHistory", "historyID", MediaHistoryModel);
    }
}

module.exports = MediaHistoryDbHandler;