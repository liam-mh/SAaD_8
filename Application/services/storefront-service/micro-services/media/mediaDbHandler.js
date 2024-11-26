const { DbHandler } = require("shared");
const MediaModel = require("./mediaModel");
const sequelize = require('../../../../config/sequelize');

class MediaDbHandler extends DbHandler {
  autoCompleteQueryFields = ["Author", "Genre", "Title", "Type"];

  constructor() {
    super("MediaID", MediaModel);
  }

  /**
   * Gets The most recent media from each type field.
   *
   * @note could introduce a limit variable if we need some more flexibility.
   * @returns
   */
  async fetchMediaByTypeAndLimit() {
    try {
      const types = ["Book", "Journal", "CD", "Periodical", "DVD", "Game"];
      const results = [];

      for (const type of types) {
        const mediaItems = await MediaModel.findAll({
          where: { Type: type },
          order: [["PublishDate", "DESC"]],
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

  async fetchMediaTopFive() {
    try {
        const selectedMedia = [];
        const seenTitles = new Set();
        const seenTypes = new Set();

        while (selectedMedia.length < 5) {
            const randomMedia = await MediaModel.findOne({
                order: [sequelize.fn('RAND')],
            });

            if (
                randomMedia &&
                !seenTitles.has(randomMedia.Title) &&
                !seenTypes.has(randomMedia.Type)
            ) {
                selectedMedia.push(randomMedia);
                seenTitles.add(randomMedia.Title);
                seenTypes.add(randomMedia.Type);
            }
        }
        return selectedMedia;
    } catch (error) {
        console.error("Error fetching top 5 media items:", error);
        throw new Error("Error fetching top 5 media items.");
    }
  }
}


module.exports = MediaDbHandler;
