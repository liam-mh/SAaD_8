import FrontEndService from "../frontEndService";

/**
 * Front end service for employee logic.
 * 
 * @author Guy Nicklin
 */
class EmployeeFrontEndService extends FrontEndService{
    constructor() {
        super('/account/employee');
    }
}

export default EmployeeFrontEndService;