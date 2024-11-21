const FrontEndService = require("../frontEndService");

class NewMediaRequestFrontEndService extends FrontEndService{
    constructor(){
        super('/storefront/new-media-request');
    }
}

module.exports = new NewMediaRequestFrontEndService();