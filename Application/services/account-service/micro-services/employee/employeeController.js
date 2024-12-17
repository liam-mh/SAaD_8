const {Controller} = require("../../../shared");
const EmployeeService = require("./employeeService")

/**
 * Controller for employee related requests.
 * Injects its service as a dependency into its base class.
 * 
 * @author Guy Nicklin
 */
class EmployeeController extends Controller {
  constructor() { 
    const service = new EmployeeService();
    super(service); 
  }
}

module.exports = EmployeeController;
