const { Service } = require("shared");
const MediaDbHandler = require("./mediaDbHandler");
const MediaObject = require("./mediaObject");

class MediaService extends Service {
  constructor() {
    const dbHandler = new MediaDbHandler();
    const object = new MediaObject();
    super(dbHandler, object); 
    this.dbHandler = dbHandler; 
  }

  async fetchTopMediaByType() {
    return this.dbHandler.getTopMediaByTypeAndLimit(); 
  }
}

module.exports = MediaService;
