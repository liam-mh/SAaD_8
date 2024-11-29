const {Service} = require("shared");
const MediaHistoryDbHandler = require("./mediaHistoryDbHandler");

/**
 * Service for media history related requests.
 * Injects its database handler as a dependency into its base class.
 */
class MediaHistoryService extends Service{
    constructor() {
        const dbHandler = new MediaHistoryDbHandler();
        super(dbHandler);
      }
}

module.exports = MediaHistoryService;