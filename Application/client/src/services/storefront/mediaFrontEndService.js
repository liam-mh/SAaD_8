import FrontEndService from "../frontEndService";
import fetchFromApiGateway from "../apiService";

/**
 * Front end service for media logic.
 * @author Guy Nicklin
 */
class MediaFrontEndService extends FrontEndService {
  autoCompleteQueryFields = ["Author", "Genre", "Title", "Type"];

  constructor() {
    super("/storefront/media");
    this.baseRoute = "/storefront/media";
  }

  /**
   * Generates a URL for media artwork hosted on CDN based on the given title and type.
   *
   * @param {string} mediaTitle - The title of the media item.
   * @param {string} mediaType - The type of the media (e.g., "movie", "album").
   * @returns {string} The generated URL or a default image URL if parameters are missing.
   *
   * @author Lewis Worton
   */
  generateImageSrc = (mediaTitle, mediaType) => {
    if (!mediaTitle || !mediaType) {
      console.warn("generateImageSrc called with missing parameters", {
        mediaTitle,
        mediaType,
      });
      return "https://saad8media.blob.core.windows.net/media-artwork/default-image.jpg";
    }
    let imgTitle = mediaTitle
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^a-zA-Z0-9-]/g, "")
      .replace(/--+/g, "-");
    return `https://saad8media.blob.core.windows.net/media-artwork/${imgTitle}-${mediaType.toLowerCase()}.jpg`;
  };

  /**
   * Fetches the carousel media by type. Limit 3
   * If needed can set param limit
   *
   * @returns {Promise<Array>} A promise that resolves to an array of top media items.
   * 
   * @author Guy Nicklin
   */
  fetchMediaByTypeAndLimit = async () => {
    const url = `${this.baseRoute}/fetchMediaByTypeAndLimit`;
    try {
      const response = await fetchFromApiGateway(url, { method: "GET" });
      return response;
    } catch (error) {
      console.error("Error fetching top media by type:", error);
      return [];
    }
  };

  /**
   * Fetches 5 random media items, ensuring no duplicates in title or type.
   *
   * @returns {Promise<Array>} A promise that resolves to an array of the top 5 unique media items.
   * 
   * @author Guy Nicklin
   */

  fetchTopFive = async () => {
    const url = `${this.baseRoute}/fetchTopFive`;
    try {
      return await fetchFromApiGateway(url, { method: "GET" });
    } catch (error) {
      console.error("Error fetching top media by type:", error);
      return [];
    }
  };
}

export default MediaFrontEndService;
