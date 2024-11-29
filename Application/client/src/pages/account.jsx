import { useEffect } from "react";
import LoginCard from "../components/LoginCard";
import moment from "moment";
const mediaFrontEndService = require("../services/storefront/mediaFrontEndService");
const emailFrontEndService = require("../services/notification/emailFrontEndService");
const branchFrontEndService = require("../services/storefront/branchFrontEndService");
const mediaHistoryFrontEndService = require("../services/storefront/mediaHistoryFrontEndService");
const employeeFrontEndService = require("../services/account/employeeFrontEndService");
const memberSubscriptionFrontEndService = require("../services/account/memberSubscriptionFrontEndService");

const AccountPage = () => {
  const checkoutBasket = async () => {
    try {
      const memberID = 14;// Im guessing we would already have this data due to login.

      const memberSubscription = await memberSubscriptionFrontEndService.get('/readRecords', {MemberID: memberID}, true)
      const currentTokens = memberSubscription.data[0].RemainingTokens;
      
      // This makes the initial record.
      // Delete if timer runs out, clear basket and exit to a different page?
      // For single media rental use "/createRecord as the path and an object with the fields defined like:
      //{
      //   MediaID: 1,
      //   MemberID: 14,
      //   BranchID: 1,
      //   Active: 0,
      //   RentStart: moment().format("YYYY-MM-DD"),
      //   RentEnd: moment().add(7, "days").format("YYYY-MM-DD")
      // }
      // For Multiple see below:
      const transactionCreated = await mediaHistoryFrontEndService.post(
        "/createRecords",
        [
          {
            MediaID: 1,
            MemberID: memberID,
            BranchID: 1,
            Active: 0,
            RentStart: moment().format("YYYY-MM-DD"),
            RentEnd: moment().add(7, "days").format("YYYY-MM-DD")
          },
          {
            MediaID: 2,
            MemberID: 14,
            BranchID: 1,
            Active: 0,
            RentStart: moment().format("YYYY-MM-DD"),
            RentEnd: moment().add(7, "days").format("YYYY-MM-DD")
          }
        ]
      );

      console.log(transactionCreated.data[0].MemberID);
      //Then update the members account we dont want to charge unless the media is rented.
      if (transactionCreated.status === 201) {
        //This could either be something you save in state or you could do some maths with the start and end dates of returned objects.
        const spentTokens = 2;
        const remainingTokens = currentTokens - spentTokens;
        try{
          const chargeCustomer = await memberSubscriptionFrontEndService.put(
            '/updateRecord',
             {
              MemberID: transactionCreated.data[0].MemberID,
              RemainingTokens: remainingTokens} 
              );
              console.log(chargeCustomer)
        }catch(error){
          console.error("Error charging customer", error)
        }
        //Just put in loop becau
        
          const deleted = await mediaHistoryFrontEndService.delete('/deleteRecord', {HistoryID: 96});//Get on creation from transactionCreated.
          console.log(deleted)
        
        
        
      } else {
        console.error("No data added to rental history");
      }

     

    } catch (error) {
      console.log("FAIL", error);
    }
  };

  useEffect(() => {
    const fetchMedia = async () => {
      for(let i = 0; i < 1; i++){
        //checkoutBasket(), [];
      }
    };
    fetchMedia(), [];
  }, []);

  // Function to send an email
  const sendWelcomeEmail = async () => {
    try {
      const response = await emailFrontEndService.post("/send", {
        to: "nicklinguy@yahoo.com", // Replace with recipient's email
        subject: "Welcome to Our Service!",
        message: "Thank you for signing up. Enjoy your stay!",
      });

      console.log("Email sent successfully:", response);
      alert("Welcome email sent!");
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email. Please try again later.");
    }
  };

  return (
    <>
      <LoginCard />

      <h1>Account Management</h1>
      <h2 id="account">My Account</h2>
      <h2 id="subscription">My Subscription</h2>
      <h2 id="library">My Library</h2>
      <h2 id="wishlist">My Wishlist</h2>
      {/* Add a button to trigger email sending */}
      <button onClick={sendWelcomeEmail}>Send Welcome Email</button>
    </>
  );
};

export default AccountPage;
