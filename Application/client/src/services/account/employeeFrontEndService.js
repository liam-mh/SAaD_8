import FrontEndService from "../frontEndService";

class EmployeeFrontEndService extends FrontEndService{
    constructor() {
        super('/account/employee');
    }
}

export default EmployeeFrontEndService;