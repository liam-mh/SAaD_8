const {Controller} = require("shared");
const BranchService = require("./branchService");

class BranchController extends Controller {
    constructor(){
        const service = new BranchService();
        super(service);
    }
}

module.exports = BranchController;