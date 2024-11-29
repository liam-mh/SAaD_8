const {Controller} = require("shared");
const WishlistService = require("./wishlistService");

/**
 * Controller for wishlist related requests.
 * Injects its service as a dependency into its base class.
 */
class WishlistController extends Controller {
    constructor(){
        const service = new WishlistService();
        super(service);
    }
}

module.exports = WishlistController;