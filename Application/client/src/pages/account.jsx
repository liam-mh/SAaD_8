import { useEffect } from "react";
import LoginCard from "../components/LoginCard";
import moment from "moment";
const mediaFrontEndService = require("../services/storefront/mediaFrontEndService");
const emailFrontEndService = require("../services/notification/emailFrontEndService");
const branchFrontEndService = require("../services/storefront/branchFrontEndService");
const mediaHistoryFrontEndService = require("../services/storefront/mediaHistoryFrontEndService");

const AccountPage = () => {
  useEffect(() => {
    const fetchMedia = async () => {
      try {
        // const autocomplete = await mediaFrontEndService.autoComplete(
        //   "/autocomplete",
        //   "The"
        // );

        //   for (const item of autocomplete) {
        //     // autocomplete is already an array of objects
        //     for (const [key, value] of Object.entries(item)) {
        //       // Only check fields listed in autoCompleteQueryFields
        //       if (
        //         mediaFrontEndService.autoCompleteQueryFields.includes(key) &&
        //         typeof value === "string" &&
        //         value.toLowerCase().includes("the")
        //       ) {
        //         console.log(`  Key: ${key}, Value: ${value}`);
        //       }
        //     }
        //   }

        // const catalog = await mediaFrontEndService.get(
        //   "/readRecords",
        //   { Title: "The Hobbit", Type: "Book" },
        //   false
        // );

        // console.log(catalog)

        // const catalog = await mediaFrontEndService.get("/readRecords");

        // const availabilityResults = await Promise.all(
        //   catalog.map(async (media) => {
        //     const availability = await mediaHistoryFrontEndService.get(
        //       "/readRecords",
        //       { MediaID: media.MediaID } // Fix here: use media.MediaID, not catalog.MediaID
        //     );
        //     // Check if availability is returned and has the Active field
        //     const activeStatus =
        //       availability?.[0]?.Active === 1
        //         ? "Active"
        //         : `Unavailable (Received: ${availability?.[0]?.Active})`;

        //     console.log("Active Status:", activeStatus);
        //     return { media, activeStatus }; // Return combined result
        //   })
        // );

        // console.log("Final Results:", availabilityResults);

        const availability = await mediaHistoryFrontEndService.get(
          "/readRecords",
        );
        console.log("Availability:", availability);

        // const mediaCatalog = await mediaFrontEndService.get(
        //   "/readRecords",
        //   {},
        //   false
        // );
        // console.log(mediaCatalog);
      } catch (error) {
        console.error("Error fetching media records:", error);
      }
      try {
        // const topMedia = await mediaFrontEndService.fetchMediaByTypeAndLimit();
        // console.log(topMedia);
      } catch (error) {
        console.error("Error fetching media records:", error);
      }
      try {
        // const topFive = await mediaFrontEndService.fetchTopFive();
        // console.log(topFive);
      } catch (error) {
        console.error("Error fetching media records:", error);
      }
      try {
      } catch (error) {
        console.error("Error fetching media records:", error);
      }
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
