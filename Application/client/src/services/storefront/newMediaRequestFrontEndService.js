import FrontEndService from "../frontEndService";

/**
 * Front end service for new media request logic.
 * @author Guy Nicklin
 */
class NewMediaRequestFrontEndService extends FrontEndService{
    constructor(){
        super('/storefront/new-media-request');
    }
}

export default NewMediaRequestFrontEndService;