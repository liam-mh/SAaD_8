import fetchFromApiGateway from "../apiService";
import FrontEndService from "../frontEndService";
import EmailFrontEndService from "../notification/emailFrontEndService";
import emailFrontEndService from "../notification/emailFrontEndService";
import Wishlist from "../storefront/wishlistFrontEndSevice";
import memberSubscriptionFrontEndService from "./memberSubscriptionFrontEndService";

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
    "You recently added the " + type  + ": " + title + " via our online " + wishType + " feature.\n\n" +
    "We just thought we would let you know it is now in stock.\n\n" +
    "Head to your online account to proceed with your rental.\n\n" +
    "The AML team";

    
    console.log(message);
    
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
      memberIDs = { MemberID: firstReservationRecord.MemberID };
      type = firstReservationRecord.Type;
      title = firstReservationRecord.Title;
      wishType = 'Reservation';
    } else {
      // Get all membersIds that have media in their wishlist.
      const wishlistRecords = wishlistData.filter(
        (item) => item.WishType === "Wishlist"
      );
      type = wishlistRecords[0]?.Type;
      title = wishlistRecords[0]?.Title;
      wishType = 'Wishlist';

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
