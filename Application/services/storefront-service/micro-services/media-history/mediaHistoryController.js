const {Controller} = require("shared");
const MediaHistoryService = require("./mediaHistoryService");

/**
 * Controller for media history related requests.
 * Injects its service as a dependency into its base class.
 * @author Guy Nicklin
 */
class MediaHistoryController extends Controller {
    constructor(){
        const service = new MediaHistoryService();
        super(service);
    }
}

module.exports = MediaHistoryController;