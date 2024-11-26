const {Service} = require("shared");
const MediaHistoryDbHandler = require("./mediaHistoryDbHandler");
const MediaHistoryObject = require("./mediaHistoryObject");

class MediaHistoryService extends Service{
    constructor() {
        const dbHandler = new MediaHistoryDbHandler();
        const object = new MediaHistoryObject();
        super(dbHandler, object);
      }
}

module.exports = MediaHistoryService;