const DbHandler = require("../../../base-classes/dbHandler");

class newMediaRequestDbHandler extends DbHandler{
    constructor(){
        super("newMediaRequest", "requestID");
    }
}

module.exports = newMediaRequestDbHandler;