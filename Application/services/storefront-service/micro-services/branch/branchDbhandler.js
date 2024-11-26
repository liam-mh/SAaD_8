const {DbHandler} = require("shared");
const BranchModel = require("./branchModel")

class BranchDbHandler extends DbHandler{
    constructor(){
        super("BranchID", BranchModel);
    }
}

module.exports = BranchDbHandler;