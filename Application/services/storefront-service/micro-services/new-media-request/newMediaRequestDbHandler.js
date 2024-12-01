const {DbHandler} = require("shared");
const NewMediaRequestModel = require("./newMediaRequestModel")

/**
 * Database handler for new media request related requests.
 * Injects its model as a dependency into its base class.
 */
class newMediaRequestDbHandler extends DbHandler{
    constructor(){
        super(NewMediaRequestModel);
    }
}

module.exports = newMediaRequestDbHandler;