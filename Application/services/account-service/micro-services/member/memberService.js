const { Service } = require("../../../shared");
const MemberDbHandler = require("../../../account-service/micro-services/member/memberDbHandler");

/**
 * Service for member related requests.
 * Injects its database handler as a dependency into its base class.
 * 
 * @author Guy Nicklin
 */
class MemberService extends Service {
  constructor() {
    const dbHandler = new MemberDbHandler();
    super(dbHandler);
  }

  /**
   * Extracts Array from the passed object and hands to the member database handler instance.
   *
   * @param {Object} memberIDs - An object containing an array of member IDs.
   * @returns {Promise<string[]>} A promise that resolves to an array of email addresses.
   * If no matching members are found, the array will be empty.
   *
   */
  async fetchEmails(memberIDs) {
    return this.dbHandler.fetchEmailsByQuery(memberIDs.MemberIDs);
  }
}

module.exports = MemberService;
