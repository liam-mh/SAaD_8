import { useEffect } from "react";
import LoginCard from "../components/LoginCard";
import moment from "moment";
const mediaFrontEndService = require("../services/storefront/mediaFrontEndService");
const emailFrontEndService = require("../services/notification/emailFrontEndService");
const branchFrontEndService = require("../services/storefront/branchFrontEndService");
const mediaHistoryFrontEndService = require("../services/storefront/mediaHistoryFrontEndService");
const employeeFrontEndService = require("../services/account/employeeFrontEndService");

const AccountPage = () => {
  const checkoutBasket = async () => {
    try {
      // This makes the initial record.
      // Delete if timer runs out, clear basket and exit to a different page?
      //
      const transactionCreated = await mediaHistoryFrontEndService.post(
        "/createRecords",
        [
          {
            MediaID: 1,
            MemberID: 14,
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
      console.log(transactionCreated.data);
    } catch (error) {
      console.log("FAIL", error);
    }
  };

  useEffect(() => {
    const fetchMedia = async () => {
      checkoutBasket();
    };
    fetchMedia();
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
