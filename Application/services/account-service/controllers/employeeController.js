const ControllerInterface = require("../../interfaces/controllerInterface");

class EmployeeController extends ControllerInterface {
    constructor(employeeService) {
        super(employeeService); // Pass the specific service to the base class
      }
}

module.exports = EmployeeController;