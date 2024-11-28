const FrontEndService = require("../frontEndService");

class Wishlist extends FrontEndService{
    constructor(){
        super('/storefront/wishlist');
    }
}

module.exports = new Wishlist();