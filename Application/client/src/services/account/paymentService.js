const FrontEndService = require('../frontEndService');

class PaymentFrontEndService extends FrontEndService{
    constructor() {
        super('/account/payment');
    }
}

module.exports = new PaymentFrontEndService();