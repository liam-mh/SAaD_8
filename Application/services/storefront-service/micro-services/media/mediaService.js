const Service = require("../../../services/base-classes/service");
const MediaDbHandler = require("./mediaDbHandler");
const MediaObject = require("./mediaObject");

class MediaService extends Service{
    constructor() {
        const dbHandler = new MediaDbHandler();
        const object = new SubsciptionObject();
        super(dbHandler, object);
      }
}

module.exports = MediaService;