import FrontEndService from "../frontEndService";

class PaymentFrontEndService extends FrontEndService{
    constructor() {
        super('/account/payment');
    }
}

export default PaymentFrontEndService;