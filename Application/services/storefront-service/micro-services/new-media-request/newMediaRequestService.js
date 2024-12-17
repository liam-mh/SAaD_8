const {Service} = require("shared");
const NewMediaRequestDbHandler = require("./newMediaRequestDbHandler");

/**
 * Service for new media request related requests.
 * Injects its database handler as a dependency into its base class.
 * @author Guy Nicklin
 */
class NewMediaRequestService extends Service{
    constructor() {
        const dbHandler = new NewMediaRequestDbHandler();
        super(dbHandler);
      }
}

module.exports = NewMediaRequestService;