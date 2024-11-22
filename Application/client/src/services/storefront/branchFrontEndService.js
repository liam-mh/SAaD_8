const FrontEndService = require("../frontEndService");

class BranchFrontEndService extends FrontEndService{
    constructor(){
        super('/storefront/branch');
    }
}

module.exports = new BranchFrontEndService();