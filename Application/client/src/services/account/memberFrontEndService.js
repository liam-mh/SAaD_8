import {fetchFromApiGateway} from "../apiService";
import FrontEndService from "../frontEndService";
import emailFrontEndService from "../notification/emailFrontEndService";
import memberSubscriptionFrontEndService from "./memberSubscriptionFrontEndService";

class MemberFrontEndService extends FrontEndService {
  constructor() {
    super("/account/member");
  }

  #generateEmail(memberEmail){
    return {
        to: memberEmail,

    };
  }

  async emailMembers(data) {
    const memberIDs = {};

    const firstReservationRecord = data.find(
      (item) => item.Type === "Reservation"
    );

    if (firstReservationRecord) {
       memberIDs = {MemberID: firstReservationRecord.MemberID};
    } else {
      const wishlistRecords = data.filter((item) => item.Type === "Wishlist");
      wishlistRecords.forEach((item) => {
        memberIDs["MemberID"] = item.MemberID; 
      });
    }
    console.log(memberIDs)
    }
      

    //const url = `${this.baseRoute}/getEmails`;
   
  }
}

export default MemberFrontEndService;
