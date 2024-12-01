const {Controller} = require("shared");
const MediaService = require("./mediaService");
const {formatDateFields} = require("shared");

/**
 * Controller for media related requests.
 * Injects its service as a dependency into its base class.
 */
class MediaController extends Controller {
    constructor(){
        const service = new MediaService();
        super(service);
        this.service = service;
    }

    async handleMediaByTypeAndLimit(){
        const records = await this.service.fetchMediaByTypeAndLimit();
        return formatDateFields(records);
    }

    async handleMediaTopFive(){
        const records = await this.service.fetchMediaTopFive();
        return formatDateFields(records);
    }

}

module.exports = MediaController;