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

  async fetchMediaByTypeAndLimit() {
    return this.dbHandler.fetchMediaByTypeAndLimit(); 
  }

  async fetchMediaTopFive(){
    return this.dbHandler.fetchMediaTopFive();
  }
}

module.exports = MediaService;
