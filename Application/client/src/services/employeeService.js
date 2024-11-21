const frontEndService = require('./frontEndService');

class EmployeeFrontEndService extends frontEndService{
    route = '/account/employee';

    constructor() {
        super(this.route);
    }
}

module.exports = new EmployeeFrontEndService();