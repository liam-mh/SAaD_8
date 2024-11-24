const {Controller} = require("shared");
const WishlistService = require("./wishlistService");

class WishlistController extends Controller {
    constructor(){
        const service = new WishlistService();
        super(service);
    }
}

module.exports = WishlistController;