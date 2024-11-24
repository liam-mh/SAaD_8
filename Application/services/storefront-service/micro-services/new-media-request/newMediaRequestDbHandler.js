const {DbHandler} = require("shared");
const NewMediaRequestModel = require("./newMediaRequestModel")

class newMediaRequestDbHandler extends DbHandler{
    constructor(){
        super("NewMediaRequest", "RequestID", NewMediaRequestModel);
    }
}

module.exports = newMediaRequestDbHandler;