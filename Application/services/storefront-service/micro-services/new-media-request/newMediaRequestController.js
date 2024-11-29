const {Controller} = require("shared");
const NewMediaRequestService = require("./newMediaRequestService");

/**
 * Controller for new media request related requests.
 * Injects its service as a dependency into its base class.
 */
class NewMediaRequestController extends Controller {
    constructor(){
        const service = new NewMediaRequestService();
        super(service);
    }
}

module.exports = NewMediaRequestController;