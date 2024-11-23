import { useEffect } from 'react';
import LoginCard from '../components/LoginCard';
const mediaFrontEndService = require('../services/storefront/mediaFrontEndService');
const emailFrontEndService = require('../services/notification/emailFrontEndService')

const AccountPage = () => {
  useEffect(() => {
    const fetchMedia = async () => {
      try {
        // //pass empty array and all flag true for all media.
        //const allMedia = await mediaFrontEndService.get('/readRecords', { fields: {}, allFlag: true });
        // //pass whatever fields you want in the fields object.
        // //by title
        // const mediaByTitle = await mediaFrontEndService.get('/readRecords', { fields: {title: "The Great Gatsby"}, allFlag: false });
        // //by title and type
        // const mediaByTitleAndType = await mediaFrontEndService.get('/readRecords', { fields: {title: "The Boy in the Striped Pyjamas", type: "DVD"}, allFlag: false });

        // console.log('all Media records:', allMedia.data); 
        // console.log('Media By Title:', mediaByTitle.data);
        // console.log('Media By Title And type', mediaByTitleAndType.data);

        
      } catch (error) {
        console.error('Error fetching media records:', error); 
      }
    };

    fetchMedia(); 
  }, []); 

  // Function to send an email
  const sendWelcomeEmail = async () => {
    try {
      const response = await emailFrontEndService.post('/send', {
        to: 'nicklinguy@yahoo.com', // Replace with recipient's email
        subject: 'Welcome to Our Service!',
        message: 'Thank you for signing up. Enjoy your stay!',
      });

      console.log('Email sent successfully:', response);
      alert('Welcome email sent!');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email. Please try again later.');
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
