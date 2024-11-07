const ServiceInterface = require('../../../interfaces/serviceInterface')
const EmployeeEntity = require("../employee/employeeEntity");

class EmployeeService extends ServiceInterface {
    constructor() {
        super(EmployeeEntity); // Pass the specific service to the base class
      }
}

module.exports = EmployeeService;
