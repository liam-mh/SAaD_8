const {DbHandler} = require("shared");
const BranchModel = require("./branchModel")

/**
 * Database handler for branch related requests.
 * Injects its model as a dependency into its base class.
 * 
 * @author Guy Nicklin
 */
class BranchDbHandler extends DbHandler{
    constructor(){
        super(BranchModel);
    }
}

module.exports = BranchDbHandler;