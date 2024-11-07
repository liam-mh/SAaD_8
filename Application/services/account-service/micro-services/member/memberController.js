const ControllerInterface = require("../../interfaces/controllerInterface");
const MemberService = require("./memberService");

class MemberController extends ControllerInterface {
  constructor() {
    super(MemberService); // Pass the specific service to the base class
  }
}

module.exports = MemberController;
