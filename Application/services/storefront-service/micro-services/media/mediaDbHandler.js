const { DbHandler } = require("shared");
const MediaModel = require("./mediaModel");

class MediaDbHandler extends DbHandler {
  constructor() {
    super("MediaID", MediaModel);
  }

  /**
   * Gets The most recent media from each type field. 
   * 
   * @note could introduce a limit variable if we need some more flexibility.
   * @returns 
   */
  async getTopMediaByTypeAndLimit() {
    try {
      const types = ['Book', 'Journal', 'CD', 'Periodical', 'DVD', 'Game'];
      const results = [];

      for (const type of types) {
        const mediaItems = await MediaModel.findAll({
          where: { Type: type },
          order: [['PublishDate', 'DESC']], 
          limit: 3,
        });

        results.push(...mediaItems);
      }

      return results; 
    } catch (error) {
      console.error("Error fetching media items:", error);
      throw new Error("Error fetching media items.");
    }
  }

  async getTopFive(){

  }
}

module.exports = MediaDbHandler;
