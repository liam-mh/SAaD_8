const generateImageSrc = (mediaTitle, mediaType) => {
    if (!mediaTitle || !mediaType) {
        console.warn("generateImageSrc called with missing parameters", { mediaTitle, mediaType });
        return "https://saad8media.blob.core.windows.net/media-artwork/default-image.jpg";
    }
    let imgTitle = mediaTitle.toLowerCase().replace(/ /g, "-").replace(/[^a-zA-Z0-9-]/g, "").replace(/--+/g, "-");
    return `https://saad8media.blob.core.windows.net/media-artwork/${imgTitle}-${mediaType.toLowerCase()}.jpg`;
};


module.exports = {
    generateImageSrc
};