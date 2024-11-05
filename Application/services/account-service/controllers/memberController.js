const ControllerInterface = require("../../interfaces/controllerInterface");

class MemberController extends ControllerInterface {
    constructor(memberService) {
        super(memberService); // Pass the specific service to the base class
      }
}

module.exports = MemberController;
