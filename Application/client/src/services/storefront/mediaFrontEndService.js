const FrontEndService = require("../frontEndService");
const fetchFromApiGateway = require("../apiService");

class MediaFrontEndService extends FrontEndService {

  autoCompleteQueryFields = [
    'Author',
    'Genre',
    'Title',
    'Type'
  ]

  constructor() {
    super("/storefront/media");
    this.baseRoute = "/storefront/media";
  }

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
   * Fetches the carousel media by type.
   *
   * @returns {Promise<Array>} A promise that resolves to an array of top media items.
   */
  fetchMediaByTypeAndLimit = async () => {
    const url = `${this.baseRoute}/fetchMediaByTypeAndLimit`;
    try {

      const response = await fetchFromApiGateway(url, { method: "GET" });
      return response.data

    } catch (error) {
      console.error("Error fetching top media by type:", error);
      return [];
    }
  };

  fetchTopFive = async () => {
    const url = `${this.baseRoute}/fetchTopFive`
    try{
      const response = await fetchFromApiGateway(url, { method: "GET"});
      console.log("response: ", response);
      return response.data
    }catch (error) {
      console.error("Error fetching top media by type:", error);
      return [];
    }
  };
}

module.exports = new MediaFrontEndService();
