const {Controller} = require("../../../shared");
const MemberService = require("./memberService");

/**
 * Controller for member related requests.
 * Injects its service dependency into the controller base class.
 */
class MemberController extends Controller {
  constructor() {
    const service = new MemberService();
    super(service); // Pass the specific service to the base class
  }
}

module.exports = MemberController;
