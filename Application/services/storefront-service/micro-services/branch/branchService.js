const {Service} = require("shared");
const BranchDbHandler = require("./branchDbHandler");
const BranchObject = require("./branchObject")

class BranchService extends Service{
    constructor() {
        const dbHandler = new BranchDbHandler();
        const object = new BranchObject();
        super(dbHandler, object);
      }
}

module.exports = BranchService;