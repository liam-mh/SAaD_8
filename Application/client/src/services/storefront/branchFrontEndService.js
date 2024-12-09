import FrontEndService from "../frontEndService";

class BranchFrontEndService extends FrontEndService{
    constructor(){
        super('/storefront/branch');
    }
}

export default BranchFrontEndService;