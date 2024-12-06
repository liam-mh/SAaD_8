import FrontEndService from "../frontEndService";

class MemberSubscriptionFrontEndService extends FrontEndService{
    constructor() {
        super('/account/member-subscription');
    }
}

export default MemberSubscriptionFrontEndService;