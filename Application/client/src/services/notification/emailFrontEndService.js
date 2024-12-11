import FrontEndService from "../frontEndService";

/**
 * Front end service for email logic
 * 
 * @author Guy Nicklin
 */
class EmailFrontEndService extends FrontEndService{
    constructor(){
        super('/notification/email');
    }
}

export default EmailFrontEndService;