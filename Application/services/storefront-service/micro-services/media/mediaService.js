const { Service } = require("shared");
const MediaDbHandler = require("./mediaDbHandler");

/**
 * Service for media related requests.
 * Injects its database handler as a dependency into its base class.
 * @author Guy Nicklin
 */
class MediaService extends Service {
  constructor() {
    const dbHandler = new MediaDbHandler();
    super(dbHandler); 
    this.dbHandler = dbHandler; 
  }

  /**
   * Handles busines logic for fetchMediaByType.
   * 
   * @returns {Promise<Object[]>} An array containing the most recent 3 unique media items from each type.
   */
  async fetchMediaByTypeAndLimit() {
    return this.dbHandler.fetchMediaByTypeAndLimit(); 
  }

  /**
   * @returns {Promise<Array>} A promise that resolves to an array of the top 5 unique media items.
   * 
   * @returns 
   */
  async fetchMediaTopFive(){
    return this.dbHandler.fetchMediaTopFive();
  }
}

module.exports = MediaService;
