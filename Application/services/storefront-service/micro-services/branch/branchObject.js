const {Object} = require("shared");

class BranchObject extends Object{
    constructor(){
        super();
        this.branchID = null;
        this.firstLineAddress = null;
        this.poscode = null;
        this.city = null;
        this.openingHours = null;
    }
}

module.exports = BranchObject;