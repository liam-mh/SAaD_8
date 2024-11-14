const fetchFromApiGateway = require('./apiService');

/**
 * Fetch members from the account service.
 * @returns {Promise<object>} - The data returned from the account service.
 */
const getAll = async () => {
    try {
        const data = await fetchFromApiGateway('/account/member/readRecords');
        return data;
    } catch (error) {
        console.error("Error fetching members:", error);
        throw error;
    }
};

// Generate URL for media image - NEEDS MOVING TO MEDIA SERVICE WHEN CREATED
const generateImageSrc = (mediaTitle, mediaType) => {
    // Remove any spaces from the media's title and replace them with hyphens
    var imgTitle = mediaTitle.toLowerCase().replace(/ /g, "-");
    // Remove any other special characters from the title
    imgTitle = imgTitle.replace(/[^a-zA-Z0-9-]/g, "");
    /* Remove any double hyphens and replace with a single hyphen 
    e.g. Better Homes & Gardens would become better-homes--gardens so extra hyphen needs removing */
    imgTitle = imgTitle.replace(/--/g, "-")
    // Form final URL
    imgSrc = "https://saad8media.blob.core.windows.net/media-artwork/" + imgTitle + "-" + mediaType.toLowerCase() + ".jpg";

    return imgSrc;
}

module.exports = { 
    getAll,
    generateImageSrc
};