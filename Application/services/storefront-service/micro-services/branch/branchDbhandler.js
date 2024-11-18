const DbHandler = require("../../../base-classes/dbHandler");

class BranchDbHandler extends DbHandler{
    constructor(){
        super("branch", "branchID");
    }
}

module.exports = BranchDbHandler;