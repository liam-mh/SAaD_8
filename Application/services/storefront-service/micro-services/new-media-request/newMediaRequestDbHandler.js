const {DbHandler} = require("shared");
const NewMediaRequestModel = require("./newMediaRequestModel")

class newMediaRequestDbHandler extends DbHandler{
    constructor(){
        super("newMediaRequest", "requestID", NewMediaRequestModel);
    }
}

module.exports = newMediaRequestDbHandler;