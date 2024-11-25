const { DbHandler } = require("shared");
const MediaModel = require("./mediaModel");

class MediaDbHandler extends DbHandler {
  constructor() {
    super("Media", "MediaID", MediaModel);
  }

  async getTopMediaByType() {
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
}

module.exports = MediaDbHandler;
