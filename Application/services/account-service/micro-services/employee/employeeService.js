const {Service} = require("../../../shared");
const EmployeeDbHandler = require("./employeDbHandler");
const EmployeeObject = require("./employeeObject")


class EmployeeService extends Service {
    constructor() {
        const dbHandler = new EmployeeDbHandler();
        const object = new EmployeeObject();
        super(dbHandler, object); 
      }
}

module.exports = EmployeeService;
