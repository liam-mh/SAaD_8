const Service = require("../../../base-classes/service");
const MemberDbHandler = require("../../../account-service/micro-services/member/memberDbHandler");
const MemberObject = require("./memberObject");

class MemberService extends Service {
  tableName = "Member";

  constructor() {
    const dbHandler = new MemberDbHandler();
    const object = new MemberObject();
    super(dbHandler, object);
  }
}

module.exports = MemberService;
