const {DbHandler} = require("shared");
const WishlistModel = require("./wishlistModel")

class WishlistDbHandler extends DbHandler{
    constructor(){
        super("Wishlist", "WishlistID", WishlistModel);
    }
}

module.exports = WishlistDbHandler;