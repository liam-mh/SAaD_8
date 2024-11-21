const FrontEndService = require("./frontEndService");

class MediaHistoryFrontEndService extends FrontEndService{
    route = '/storefront/media-history';

    constructor(){
        super(this.route);
    }
}

module.exports = new MediaHistoryFrontEndService();