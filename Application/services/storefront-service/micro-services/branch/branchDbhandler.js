const {DbHandler} = require("shared");

class BranchDbHandler extends DbHandler{
    constructor(){
        super("branch", "branchID");
    }
}

module.exports = BranchDbHandler;