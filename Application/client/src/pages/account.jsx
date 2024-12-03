import React, { useContext, useState, useEffect } from 'react';
import { Container } from "react-bootstrap";
import { SessionContext } from '../services/sessionContext';

import LoginCard from "../components/Login-Card/LoginCard";

const AccountPage = () => {
  const { user } = useContext(SessionContext) || {};

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