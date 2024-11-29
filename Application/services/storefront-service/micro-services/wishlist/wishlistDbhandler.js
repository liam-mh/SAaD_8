const {DbHandler} = require("shared");
const WishlistModel = require("./wishlistModel")

/**
 * Database handler for wishlist related requests.
 * Injects its model as a dependency into its base class.
 */
class WishlistDbHandler extends DbHandler{
    constructor(){
        super(WishlistModel);
    }
}

module.exports = WishlistDbHandler;