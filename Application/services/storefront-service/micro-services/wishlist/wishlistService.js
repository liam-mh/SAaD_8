const {Service} = require("shared");
const WishlistDbHandler = require("./wishlistDbhandler");

/**
 * Service for wishlist related requests.
 * Injects its database handler as a dependency into its base class.
 */
class WishlistService extends Service{
    constructor() {
        const dbHandler = new WishlistDbHandler();
        super(dbHandler);
      }
}

module.exports = WishlistService;