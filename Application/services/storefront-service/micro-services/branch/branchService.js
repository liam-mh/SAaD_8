const {Service} = require("shared");
const BranchDbHandler = require("./branchDbHandler");

/**
 * Service for branch related requests.
 * Injects its database handler as a dependency into its base class.
 * @author Guy Nicklin
 */
class BranchService extends Service{
    constructor() {
        const dbHandler = new BranchDbHandler();
        super(dbHandler);
      }
}

module.exports = BranchService;