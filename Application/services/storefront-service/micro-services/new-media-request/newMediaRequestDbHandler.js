const {DbHandler} = require("shared");

class newMediaRequestDbHandler extends DbHandler{
    constructor(){
        super("newMediaRequest", "requestID");
    }
}

module.exports = newMediaRequestDbHandler;