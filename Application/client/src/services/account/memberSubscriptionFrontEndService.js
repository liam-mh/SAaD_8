import FrontEndService from "../frontEndService";

/**
 * Front end service for Member subscription logic.
 * 
 * @author Guy Nicklin
 */
class MemberSubscriptionFrontEndService extends FrontEndService{
    constructor() {
        super('/account/member-subscription');
    }
}

export default MemberSubscriptionFrontEndService;