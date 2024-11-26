const FrontEndService = require('../frontEndService');

class EmployeeFrontEndService extends FrontEndService{
    constructor() {
        super('/account/employee');
    }
}

module.exports = new EmployeeFrontEndService();