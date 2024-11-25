const {DbHandler} = require("shared");
const NewMediaRequestModel = require("./newMediaRequestModel")

class newMediaRequestDbHandler extends DbHandler{
    constructor(){
        super("RequestID", NewMediaRequestModel);
    }
}

module.exports = newMediaRequestDbHandler;