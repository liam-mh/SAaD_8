const FrontEndService = require('../frontEndService');

class MemberSubscriptionFrontEndService extends FrontEndService{
    constructor() {
        super('/account/member-subscription');
    }
}

module.exports = new MemberSubscriptionFrontEndService();