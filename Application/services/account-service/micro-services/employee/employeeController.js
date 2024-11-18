const Controller = require("../../../base-classes/controller");
const EmployeeService = require("./employeeService")

/**
 * Controller for employee related requests.
 * Injects its service dependency into the controller base class.
 */
class EmployeeController extends Controller {
  constructor() { 
    const service = new EmployeeService();
    super(service); 
  }
}

module.exports = EmployeeController;
