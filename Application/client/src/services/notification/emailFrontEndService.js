import FrontEndService from "../frontEndService";

class EmailFrontEndService extends FrontEndService{
    constructor(){
        super('/notification/email');
    }
}

export default EmailFrontEndService;