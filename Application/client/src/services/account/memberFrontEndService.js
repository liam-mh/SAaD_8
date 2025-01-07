import FrontEndService from "../frontEndService";
import EmailFrontEndService from "../notification/emailFrontEndService";

/**
 * Frond end service for member logic.
 * 
 * @author Guy Nicklin
 */
class MemberFrontEndService extends FrontEndService {
  emailFrontEndService = new EmailFrontEndService();
  constructor() {
    super("/account/member");
  }

  /**
   * generates and sends emails to the provided list of email addresses.
   *
   * @param {Array} emailAddresses - An array of email addresses.
   */
  async #genAndSendEmails(emailAddresses, type, title, wishType) {
    const message =
      "You recently added the " +
      type +
      ": " +
      title +
      " via our online " +
      wishType +
      " feature.\n\n" +
      "We just thought we would let you know it is now in stock.\n\n" +
      "Head to your online account to proceed with your rental.\n\n" +
      "The AML team";

    for (let email of emailAddresses) {
      try {
        // Sending the email to each address using the emailFrontEndService
        await this.emailFrontEndService.post("/send", {
          to: email,
          subject: `Great news! ${title} ${type} is back in stock.`,
          message: message,
        });
      } catch (error) {
        console.error(`Failed to send email to: ${email}`, error);
      }
    }
  }

  /**
   * Processes a member's wishlist or reservation and sends email notifications.
   *
   * @param {Array<Object>} wishlistData - List of wishlist or reservation items containing `MemberID`, `WishType`, `Type`, and `Title`.
   *
   * @returns {Promise<void>} Resolves when emails are sent, or an empty array on error.
   */

  async handleMembersWishlist(wishlistData) {
    let memberIDs = {};
    let type;
    let title;
    let wishType;

    // Email reservations first.
    const firstReservationRecord = wishlistData.find(
      (item) => item.WishType === "Reservation"
    );

    if (firstReservationRecord) {
      // Get the member with the oldest reservation.
      memberIDs = { MemberIDs: [firstReservationRecord.MemberID] };
      type = firstReservationRecord.Type;
      title = firstReservationRecord.Title;
      wishType = "Reservation";
    } else {
      // Get all membersIds that have media in their wishlist.
      const wishlistRecords = wishlistData.filter(
        (item) => item.WishType === "Wishlist"
      );
      type = wishlistRecords[0]?.Type;
      title = wishlistRecords[0]?.Title;
      wishType = "Wishlist";

      memberIDs["MemberIDs"] = [];
      wishlistRecords.forEach((item) => {
        memberIDs["MemberIDs"].push(item.MemberID);
      });
    }

    try {
      const emails = await this.get("/fetchEmails", memberIDs);
      this.#genAndSendEmails(emails.data, type, title, wishType);
    } catch (error) {
      console.error("Error fetching member emails:", error);
      return [];
    }
  }
}

export default MemberFrontEndService;
