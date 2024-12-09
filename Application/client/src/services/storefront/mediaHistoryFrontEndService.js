import FrontEndService from "../frontEndService";

class MediaHistoryFrontEndService extends FrontEndService{
    constructor(){
        super('/storefront/media-history');
    }
}

export default MediaHistoryFrontEndService;