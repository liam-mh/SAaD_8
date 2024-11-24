const {Service} = require("shared");
const WishlistDbHandler = require("./wishlistDbhandler");
const WishlistObject = require("./wishlistObject");

class WishlistService extends Service{
    constructor() {
        const dbHandler = new WishlistDbHandler();
        const object = new WishlistObject();
        super(dbHandler, object);
      }
}

module.exports = WishlistService;