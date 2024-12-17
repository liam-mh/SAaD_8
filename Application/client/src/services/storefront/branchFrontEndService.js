import FrontEndService from "../frontEndService";

/**
 * Front end service for Branch logic.
 * 
 * @author Guy Nicklin
 */
class BranchFrontEndService extends FrontEndService{
    constructor(){
        super('/storefront/branch');
    }
}

export default BranchFrontEndService;