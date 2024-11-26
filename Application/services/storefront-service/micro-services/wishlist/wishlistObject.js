const {Object} = require("shared");

class WishlistObject extends Object{
    constructor(){
        super();
        this.WishlistID = null;
        this.MemberID = null;
        this.Title = null;
        this.Type = null; //enum (same as others)
        this.DateTime = null;
        this.WishType = null;//enum 'Wishlist','Reservation'
    }
}

module.exports = WishlistObject;