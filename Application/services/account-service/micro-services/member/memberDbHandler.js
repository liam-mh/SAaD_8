const {DbHandler} = require("../../../shared");
const MemberModel = require("./memberModel")

/**
 * Database handler for member related requests.
 * Injects its model as a dependency into its base class.
 * 
 * @author Guy Nicklin
 */
class MemberDbHandler extends DbHandler {
  constructor() {
    const removeFromGrouping = ['Password'];
    super(MemberModel, removeFromGrouping);
  }

  /**
   * Fetches emails for members based on an array of member IDs.
   * 
   * @param {Array<Number>} memberIDs - An array of member IDs to query.
   * @returns {Promise<Array<String>>} - A promise that resolves to an array of email addresses.
   * @throws {Error} - Throws an error if the query fails.
   */
  async fetchEmailsByQuery(memberIDs){
    try {
      const members = await this.model.findAll({
        where: {
          MemberID: memberIDs 
        },
        attributes: ['Email'], 
      });
  
      // Return the emails as an array of strings
      return members.map(member => member.Email);
    } catch (error) {
      console.error('Error fetching emails:', error);
      throw new Error('Failed to fetch emails');
    }
  }
}

module.exports = MemberDbHandler;
