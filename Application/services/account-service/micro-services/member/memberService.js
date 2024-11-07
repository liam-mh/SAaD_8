const ServiceInterface = require("../../../interfaces/serviceInterface");
const MemberEntity = require("../../../account-service/micro-services/member/memberEntity")

class MemberService extends ServiceInterface {
  constructor() {
    super(MemberEntity);
    console.log("Member Service") // Pass the specific service to the base class
  }
}

module.exports = MemberService;
