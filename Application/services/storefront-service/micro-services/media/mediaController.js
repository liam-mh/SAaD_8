const {Controller} = require("shared");
const MediaService = require("./mediaService");

class MediaController extends Controller {
    constructor(){
        const service = new MediaService();
        super(service);
        this.service = service;
    }

    async handleGetTopMediaByType(){
        return this.service.fetchTopMediaByType();
    }

}

module.exports = MediaController;