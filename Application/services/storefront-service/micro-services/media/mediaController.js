const { Controller } = require("shared");
const MediaService = require("./mediaService");
const { formatDateFields } = require("shared");

/**
 * Controller for media related requests.
 * Injects its service as a dependency into its base class.
 * @author Guy Nicklin
 */
class MediaController extends Controller {
  constructor() {
    const service = new MediaService();
    super(service);
    this.service = service;
  }

  
  /**
   * Gets the most recent 3 unique media from each type field.
   *
   * @returns {Promise<Object[]>} An array containing the most recent 3 unique media items from each type.
   */
  async handleMediaByTypeAndLimit() {
    const records = await this.service.fetchMediaByTypeAndLimit();
    return formatDateFields(records);
  }

  /**
   * Fetches 5 random media items, ensuring no duplicates in title or type.
   *
   * @returns {Promise<Array>} A promise that resolves to an array of the top 5 unique media items.
   */  
  async handleMediaTopFive() {
    const records = await this.service.fetchMediaTopFive();
    return formatDateFields(records);
  }
}

module.exports = MediaController;
