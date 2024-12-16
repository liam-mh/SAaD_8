const {Controller} = require("shared");
const BranchService = require("./branchService");

/**
 * Controller for branch related requests.
 * Injects its service as a dependency into its base class.
 * 
 * @author Guy Nicklin
 */
class BranchController extends Controller {
    constructor(){
        const service = new BranchService();
        super(service);
    }
}

module.exports = BranchController;