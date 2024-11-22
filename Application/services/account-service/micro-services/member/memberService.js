const Service = require("../../../base-classes/service");
const MemberDbHandler = require("../../../account-service/micro-services/member/memberDbHandler");
const MemberObject = require("./memberObject");
const MemberModel = require('./memberModel');

class MemberService extends Service {
  constructor() {
    const dbHandler = new MemberDbHandler();
    const object = new MemberObject();
    super(dbHandler, object, MemberModel);
  }
}

module.exports = MemberService;
