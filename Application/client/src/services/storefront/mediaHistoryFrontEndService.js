const FrontEndService = require("../frontEndService");

class MediaHistoryFrontEndService extends FrontEndService{
    constructor(){
        super('/storefront/media-history');
    }
}

module.exports = new MediaHistoryFrontEndService();