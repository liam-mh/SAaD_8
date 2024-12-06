import FrontEndService from "../frontEndService";

class SubscriptionFrontEndService extends FrontEndService{
    constructor() {
        super('/account/subscription');
    }
}

export default SubscriptionFrontEndService;