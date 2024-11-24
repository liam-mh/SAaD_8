const {DbHandler} = require("shared");

class MediaHistoryDbHandler extends DbHandler{
    constructor(){
        super("mediaHistory", "historyID");
    }
}

module.exports = MediaHistoryDbHandler;