const FrontEndService = require('./frontEndService');

class MemberFrontEndService extends FrontEndService {
    constructor(){
        super('/account/member');
    }
}

module.exports = new MemberFrontEndService();