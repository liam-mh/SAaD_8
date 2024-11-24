const {Controller} = require("shared");
const MediaHistoryService = require("./mediaHistoryService");

class MediaHistoryController extends Controller {
    constructor(){
        const service = new MediaHistoryService();
        super(service);
    }
}

module.exports = MediaHistoryController;