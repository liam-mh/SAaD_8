const {DbHandler} = require("shared");
const MediaHistoryModel = require("./mediaHistoryModel");

/**
 * Database handler for media history related requests.
 * Injects its model as a dependency into its base class.
 * @author Guy Nicklin
 */
class MediaHistoryDbHandler extends DbHandler{
    constructor(){
        super(MediaHistoryModel);
    }
}

module.exports = MediaHistoryDbHandler;