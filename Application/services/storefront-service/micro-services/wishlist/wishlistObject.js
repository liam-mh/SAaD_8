const Object = require("../../../base-classes/object");

class WishlistObject extends Object{
    constructor(){
        super();
        this.wishlistID = null;
        this.memberID = null;
        this.title = null;
        this.type = null;
        this.dateTime = null;
        this.widhType = null;
    }
}

module.exports = WishlistObject;