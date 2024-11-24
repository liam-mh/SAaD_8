const {Controller} = require("shared");
const MediaService = require("./mediaService");

class MediaController extends Controller {
    constructor(){
        const service = new MediaService();
        super(service);
    }

    
}

module.exports = MediaController;