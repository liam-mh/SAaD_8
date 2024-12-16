import FrontEndService from "../frontEndService";

/**
 * Front End service for payment logic.
 * 
 * @author Guy Nicklin
 */
class PaymentFrontEndService extends FrontEndService{
    constructor() {
        super('/account/payment');
    }
}

export default PaymentFrontEndService;