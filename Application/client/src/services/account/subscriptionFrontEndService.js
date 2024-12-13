import FrontEndService from "../frontEndService";

/**
 * Front end service for Subscription logic.
 * 
 * @author Guy Nicklin
 */
class SubscriptionFrontEndService extends FrontEndService{
    constructor() {
        super('/account/subscription');
    }
}

export default SubscriptionFrontEndService;