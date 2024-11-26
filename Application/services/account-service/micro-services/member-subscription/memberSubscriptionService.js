const {Service} = require("../../../shared");
const MemberSubscriptionDbHandler = require("./memberSubscriptionDbHandler");
const MemberSubscriptionObject = require("./memberSubscriptionObject");

class MemberSubscriptionService extends Service {
  constructor() {
    const dbHandler = new MemberSubscriptionDbHandler();
    const object = new MemberSubscriptionObject();
    super(dbHandler, object);
  }
}

module.exports = MemberSubscriptionService;