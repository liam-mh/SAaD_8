import ControllerInterface from "../../interfaces/controllerInterface";

class EmployeeController extends ControllerInterface {
    constructor(employeeService) {
        super(employeeService); // Pass the specific service to the base class
      }
}

export default EmployeeController;