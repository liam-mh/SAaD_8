const {DbHandler} = require("shared");
const BranchModel = require("./branchModel")

class BranchDbHandler extends DbHandler{
    constructor(){
        super("Branch", "BranchID", BranchModel);
    }
}

module.exports = BranchDbHandler;