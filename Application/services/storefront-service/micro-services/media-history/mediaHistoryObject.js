const Object = require("../../../base-classes/object");

class MediaHistoryObject extends Object{
    constructor(){
        super();
        this.historyID = null;
        this.mediaID = null;
        this.branchID = null;
        this.employeeID = null;
        this.active = null;
        this.rentStart = null;
        this.rentEnd = null;
        this.actualReturn = null;
    }
}

module.exports = MediaHistoryObject;