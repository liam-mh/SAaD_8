import FrontEndService from "../frontEndService";

/**
 * Front end service for media logic.
 * @author Guy Nicklin
 */
class WishlistFrontEndService extends FrontEndService{
    constructor(){
        super('/storefront/wishlist');
    }
}

export default WishlistFrontEndService;