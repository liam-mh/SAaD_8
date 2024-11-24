const {DbHandler} = require("shared");

class WishlistDbHandler extends DbHandler{
    constructor(){
        super("wishlist", "wishlistID");
    }
}

module.exports = WishlistDbHandler;