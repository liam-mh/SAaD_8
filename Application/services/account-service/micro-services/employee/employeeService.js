const {Service} = require("../../../shared");
const EmployeeDbHandler = require("./employeDbHandler");

/**
 * Service for employee related requests.
 * Injects its database handler as a dependency into its base class.
 * 
 * @author Guy Nicklin
 */
class EmployeeService extends Service {
    constructor() {
        const dbHandler = new EmployeeDbHandler();
        super(dbHandler); 
      }
}

module.exports = EmployeeService;
