import FrontEndService from "../frontEndService";

/**
 * Front end service for media history logic.
 * @author Guy Nicklin
 */
class MediaHistoryFrontEndService extends FrontEndService{
    constructor(){
        super('/storefront/media-history');
    }
}

export default MediaHistoryFrontEndService;