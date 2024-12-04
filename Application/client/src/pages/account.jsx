import React, { useContext, useState, useEffect } from 'react';
import { Container, Table, Button, } from "react-bootstrap";
import { SessionContext } from '../services/sessionContext';
import { useNavigate } from 'react-router-dom';
import wishlistFrontEndSevice from '../services/storefront/wishlistFrontEndSevice';
import mediaFrontEndService from '../services/storefront/mediaFrontEndService';

import LoginCard from "../components/Login-Card/LoginCard";

const AccountPage = () => {
  const { user } = useContext(SessionContext) || {};
  const [wishlistItems, setWishlistItems] = useState([]);

  const navigate = useNavigate();
  
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
        setWishlistItems(response.data || {});
      } catch (error) {
        console.error("Error fetching wishlist data:", error);
      }
    }

    loadData();
  }, [user]);

  const handleRemove = (itemToRemove) => {
    const RemoveData = async () => {
      try {
        const response = await wishlistFrontEndSevice.delete(
          '/deleteRecord', { WishlistID: itemToRemove.WishlistID }
        );
        setWishlistItems((prevItems) =>
          prevItems.filter((item) => item.WishlistID !== itemToRemove.WishlistID)
        );
      } catch (error) {
        console.error("Error removing wishlist data:", error);
      }
    }

    RemoveData();
  };

  const handleReserve = (itemToReserve) => {
    const UpdateData = async () => {
      try {
        const response = await wishlistFrontEndSevice.put(
          '/updateRecord', 
          {
            WishlistID: itemToReserve.WishlistID, 
            WishType: 'Reservation'
          }
        );
        setWishlistItems((prevItems) =>
          prevItems.map((item) =>
            item.WishlistID === itemToReserve.WishlistID
              ? { ...item, WishType: 'Reservation' }
              : item
          )
        );
      } catch (error) {
        console.error("Error Updating wishlist data:", error);
      }
    }

    UpdateData();
  }

  const handleRent = (itemToRent) => {
    const state = { mediaType: itemToRent.Type, mediaTitle: itemToRent.Title };
    navigate('/media', { state });
  };

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
          <div className="content-panel">
            {wishlistItems.length > 0 ? (
              <Table hover className="aml-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Reserve</th>
                    <th>Rent</th>
                  </tr>
                </thead>
                <tbody>
                  {wishlistItems.map((item, index) => {
                    const mediaArtwork = mediaFrontEndService.generateImageSrc(item.Title, item.Type);
                    const reservation = 
                      item.WishType === 'Reservation'
                      ? true
                      : false
                    ;

                    return (
                      <tr key={index} style={{ verticalAlign: 'middle' }}>
                        {/* Product */}
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
                            <div>
                              <Button variant="danger" onClick={() => handleRemove(item)}>
                                X
                              </Button>
                            </div>
                            <div style={{ flex: '0 0 auto' }}>
                              <img
                                src={mediaArtwork}
                                alt="Media Artwork"
                                style={{
                                  height: '7rem',
                                  aspectRatio: '1',
                                  objectFit: 'contain',
                                }}
                              />
                            </div>
                            <div>
                              <strong>{item.Title}</strong>
                              <br />
                              <span>Type: {item.Type}</span>
                              <br />
                              <span>Rent tokens per week: 1</span>
                            </div>
                          </div>
                        </td>
      
                        {/* Reserve */}
                        <td>
                          {!reservation ? (
                            <Button className='button-secondary-outline' onClick={handleReserve} Title='Reserve Media'>
                              <i className="bi bi-calendar-plus"></i>
                            </Button>
                          ) : (
                            <span className='highlight-orange-outline'  Title='In Queue For Media'>
                              <i className="bi bi-clock-fill"></i>
                            </span>
                          )}
                        </td>

                        {/* Rent */}
                        <td>
                          {!reservation && (
                            <Button className='button-primary' onClick={() => handleRent(item)} Title='Rent Media'>
                              <i className="bi bi-plus-lg"></i>
                            </Button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            ) : (
              <span>Nothing in wishlist</span>
            )}
          </div>
        </>
      )}
    </Container>
  );
};

export default AccountPage;