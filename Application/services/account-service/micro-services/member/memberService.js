const ServiceInterface = require("../../../interfaces/serviceInterface");
const MemberEntity = require("../")

class MemberService extends ServiceInterface {
  constructor() {
    super(memberEntity); // Pass the specific service to the base class
  }
}

module.exports = MemberService;
