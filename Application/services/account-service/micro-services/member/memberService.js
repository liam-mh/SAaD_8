const ServiceInterface = require("../../../interfaces/serviceInterface");
const MemberEntity = require("../../../account-service/micro-services/member/memberEntity")

class MemberService extends ServiceInterface {
  constructor() {
    const entity = new MemberEntity();
    super(entity);
  }
}

module.exports = MemberService;
