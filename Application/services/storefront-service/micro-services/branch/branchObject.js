const {Object} = require("shared");

class BranchObject extends Object{
    constructor(){
        super();
        this.BranchID = null;
        this.FirstLineAddress = null;
        this.Postcode = null;
        this.city = null;
        this.OpeningHours = null;
    }
}

module.exports = BranchObject;