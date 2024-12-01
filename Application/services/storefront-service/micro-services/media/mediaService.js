const { Service } = require("shared");
const MediaDbHandler = require("./mediaDbHandler");

/**
 * Service for media related requests.
 * Injects its database handler as a dependency into its base class.
 */
class MediaService extends Service {
  constructor() {
    const dbHandler = new MediaDbHandler();
    super(dbHandler); 
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
