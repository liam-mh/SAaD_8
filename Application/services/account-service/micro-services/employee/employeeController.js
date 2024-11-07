const ControllerInterface = require("../../../interfaces/controllerInterface");
const EmployeeService = require("../employee/employeeService")

class EmployeeController extends ControllerInterface {
  constructor() { 
    super(EmployeeService); // Pass the specific service to the base class
  }
}

module.exports = EmployeeController;
