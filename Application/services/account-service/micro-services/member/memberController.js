const {Controller} = require("shared");
const MemberService = require("./memberService");

/**
 * Service for member related requests.
 * Injects its service as a dependency into its base class.
 */
class MemberController extends Controller {
  constructor() {
    const service = new MemberService();
    super(service); 
  }

   /**
   * Handles the fetching of member emails based on the provided member IDs.
   * 
   * @param {Object} memberIDs - An object containing a list of member IDs.
   * @returns {Promise<Object>} - A promise resolving to the fetched email data.
   */
  async handleFetchEmails(memberIDs){
    return this.service.fetchEmails(memberIDs)
  }
}

module.exports = MemberController;
