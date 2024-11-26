const {Object} = require("shared");

class MediaHistoryObject extends Object{
    constructor(){
        super();
        this.HistoryID = null;
        this.MediaID = null;
        this.BranchID = null;
        this.EmployeeID = null;
        this.Active = null; 
        this.RentStart = null;
        this.RentEnd = null;
        this.ActualReturn = null;
    }
}

module.exports = MediaHistoryObject;