import FrontEndService from "../frontEndService";

class WishlistFrontEndService extends FrontEndService{
    constructor(){
        super('/storefront/wishlist');
    }
}

export default WishlistFrontEndService;