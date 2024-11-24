const {Service} = require("shared");
const NewMediaRequestDbHandler = require("./newMediaRequestDbHandler");
const NewMediaRequestObject = require("./newMediaRequestObject");

class NewMediaRequestService extends Service{
    constructor() {
        const dbHandler = new NewMediaRequestDbHandler();
        const object = new NewMediaRequestObject();
        super(dbHandler, object);
      }
}

module.exports = NewMediaRequestService;