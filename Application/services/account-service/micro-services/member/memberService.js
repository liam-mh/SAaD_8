const ServiceInterface = require("../../../interfaces/serviceInterface");
const MemberEntity = require("../../../account-service/micro-services/member/memberEntity");
const MemberObject = require("./memberObject")

class MemberService extends ServiceInterface {
  tableName = "Member";

  constructor() {
    const entity = new MemberEntity();
    const object = new MemberObject();
    super(entity, object);
  }
}

module.exports = MemberService;
