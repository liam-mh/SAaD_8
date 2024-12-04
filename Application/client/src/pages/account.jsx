import React, { useContext, useState, useEffect } from 'react';
import { Container } from "react-bootstrap";
import { SessionContext } from '../services/sessionContext';
import wishlistFrontEndSevice from '../services/storefront/wishlistFrontEndSevice';

import LoginCard from "../components/Login-Card/LoginCard";

const AccountPage = () => {
  const { user } = useContext(SessionContext) || {};
  const [wishlistItems, setWishlistItems] = useState([]);
  /**
   * WISHLIST SCHEMA
  {
    WishlistID: '',
    MemberID: '',
    Title: '',
    Type: '',
    DateTime: '',
    WishType: 'Wishlist || Reservation'
  }
  */

  // load user wishlist
  useEffect (() => {
    const loadData = async () => {
      try {
        const response = await wishlistFrontEndSevice.get(
          '/readRecords', { MemberID: user.MemberID }
        );
        setWishlistItems(response.data[0] || {});
      } catch (error) {
        console.error("Error fetching wishlist data:", error);
      }
    }

    loadData();
  }, [user]);

  return (
    <Container fluid="lg">
      <h1 className="pb-2">Account Management</h1>
      {!user ? (
        <LoginCard />
      ) : (
        <>
          <h2 id="account">My Account</h2>
          <h2 id="subscription">My Subscription</h2>
          <h2 id="library">My Library</h2>
          <h2 id="wishlist">My Wishlist</h2>
        </>
      )}
    </Container>
  );
};

export default AccountPage;