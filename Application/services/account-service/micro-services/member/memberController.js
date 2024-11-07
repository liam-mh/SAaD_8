const ControllerInterface = require("../../../interfaces/controllerInterface");
const MemberService = require("./memberService");


class MemberController extends ControllerInterface {
  constructor() {
    const service = new MemberService();
    super(service); // Pass the specific service to the base class
  }
  
}

module.exports = MemberController;
