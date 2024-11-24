const {DbHandler} = require("shared");
const WishlistModel = require("./wishlistModel")

class WishlistDbHandler extends DbHandler{
    constructor(){
        super("wishlist", "wishlistID", WishlistModel);
    }
}

module.exports = WishlistDbHandler;