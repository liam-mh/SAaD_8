const DbHandler = require("../../../base-classes/dbHandler");

class WishlistDbHandler extends DbHandler{
    constructor(){
        super("wishlist", "wishlistID");
    }
}

module.exports = WishlistDbHandler;