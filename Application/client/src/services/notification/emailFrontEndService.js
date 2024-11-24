const FrontEndService =  require("../frontEndService");

class EmailFrontEndService extends FrontEndService{
    constructor(){
        super('/notification/email');
    }
}

module.exports = new EmailFrontEndService();