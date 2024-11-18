const DbHandler = require("../../../base-classes/dbHandler");

class MediaHistoryDbHandler extends DbHandler{
    constructor(){
        super("mediaHistory", "historyID");
    }
}

module.exports = MediaHistoryDbHandler;