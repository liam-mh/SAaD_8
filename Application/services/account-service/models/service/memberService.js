const ServiceInterface = require("../../interfaces/ServiceInterface");

class MemberService extends ServiceInterface {
    constructor(memberEntity) {
        super(memberEntity); // Pass the specific service to the base class
      }
}

module.exports = MemberService;