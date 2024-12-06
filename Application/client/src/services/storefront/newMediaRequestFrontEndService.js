import FrontEndService from "../frontEndService";

class NewMediaRequestFrontEndService extends FrontEndService{
    constructor(){
        super('/storefront/new-media-request');
    }
}

export default NewMediaRequestFrontEndService;