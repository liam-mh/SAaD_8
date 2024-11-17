const Controller = require("../../../base-classes/controller");
const NewMediaRequestService = require("./newMediaRequestService");

class NewMediaRequestController extends Controller {
    constructor(){
        const service = new NewMediaRequestService();
        super(service);
    }
}

module.exports = NewMediaRequestController;