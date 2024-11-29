const {Service} = require("../../../shared");
const MemberDbHandler = require("../../../account-service/micro-services/member/memberDbHandler");

/**
 * Service for member related requests.
 * Injects its database handler as a dependency into its base class.
 */
class MemberService extends Service {
  constructor() {
    const dbHandler = new MemberDbHandler();
    super(dbHandler);
  }
}

module.exports = MemberService;


