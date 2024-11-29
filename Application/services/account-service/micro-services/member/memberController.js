const {Controller} = require("shared");
const MemberService = require("./memberService");

/**
 * Service for member related requests.
 * Injects its service as a dependency into its base class.
 */
class MemberController extends Controller {
  constructor() {
    const service = new MemberService();
    super(service); // Pass the specific service to the base class
  }
}

module.exports = MemberController;
