const { DbHandler } = require("shared");
const MediaModel = require("./mediaModel");
const sequelize = require('../../../../config/sequelize');

/**
 * Database handler for media related requests.
 * Injects its model as a dependency into its base class.
 */
class MediaDbHandler extends DbHandler {
  types = ["Book", "Journal", "CD", "Periodical", "DVD", "Game"];

  constructor() {
    const autoCompleteQueryFields = ["Author", "Genre", "Title", "Type"];
    const removeFromGrouping = ['BranchID'];
    super(MediaModel, removeFromGrouping, autoCompleteQueryFields);
  }

   /**
   * Gets the most recent 3 unique media from each type field.
   *
   * @returns {Promise<Object[]>} An array containing the most recent 3 unique media items from each type.
   */
   async fetchMediaByTypeAndLimit() {
    try {
      const results = [];

      for (const type of this.types) {
        // Fetch the most recent 3 unique media of the current type.
        const mediaList = await MediaModel.findAll({
          where: { Type: type },
          attributes: [
            'Title', 
            'Author',
            'Genre',
            'PublishDate',
            'Type'
          ],
          // Only fetch distinct records, by disregarding the primary key.
          group: ['Type', 'Title', 'Author', 'Genre', 'PublishDate'],
          order: [['PublishDate', 'DESC']], 
          limit: 3, 
        });

        // Push the result to the final array
        if (mediaList && mediaList.length > 0) {
          results.push(...mediaList);
        }
      }

      return results;
    } catch (error) {
      console.error("Error fetching media by type:", error);
      throw error;
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
