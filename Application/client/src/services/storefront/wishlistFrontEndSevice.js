import FrontEndService from "../frontEndService";

class Wishlist extends FrontEndService{
    constructor(){
        super('/storefront/wishlist');
    }
}

export default Wishlist;