const { DbHandler } = require("shared");
const MediaModel = require("./mediaModel");
const sequelize = require('../../../../config/sequelize');

class MediaDbHandler extends DbHandler {
  autoCompleteQueryFields = ["Author", "Genre", "Title", "Type"];
  types = ["Book", "Journal", "CD", "Periodical", "DVD", "Game"];

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
      const selectedMedia = [];
      const seenTitles = new Set();
      const seenTypes = new Map(); 
      const totalNeeded = this.types.length * 3; 

      while (selectedMedia.length < totalNeeded) {
        const randomMedia = await MediaModel.findOne({
          order: [sequelize.fn('RAND')],
        });

        if (
          randomMedia &&
          !seenTitles.has(randomMedia.Title) &&
          (seenTypes.get(randomMedia.Type) || 0) < 3
        ) {
          selectedMedia.push(randomMedia);
          seenTitles.add(randomMedia.Title);

          // Update the count for this type
          seenTypes.set(randomMedia.Type, (seenTypes.get(randomMedia.Type) || 0) + 1);
        }
      }

      return selectedMedia;
    } catch (error) {
      console.error("Error fetching media by type and limit:", error);
      throw new Error("Error fetching media by type and limit.");
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
