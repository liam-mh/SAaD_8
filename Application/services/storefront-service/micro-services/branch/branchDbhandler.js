const {DbHandler} = require("shared");
const BranchModel = require("./branchModel")

class BranchDbHandler extends DbHandler{
    constructor(){
        super("branch", "branchID", BranchModel);
    }
}

module.exports = BranchDbHandler;