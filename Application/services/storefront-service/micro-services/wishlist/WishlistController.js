const Controller = require("../../../base-classes/controller");
const WishlistService = require("./wishlistService");

class WishlistController extends Controller {
    constructor(){
        const service = new WishlistService();
        super(service);
    }
}

module.exports = WishlistController;