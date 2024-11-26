const FrontEndService = require('../frontEndService');

class SubscriptionFrontEndService extends FrontEndService{
    constructor() {
        super('/account/subscription');
    }
}

module.exports = new SubscriptionFrontEndService();