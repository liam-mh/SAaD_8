import React, { useContext, useState, useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { SessionContext } from "../services/sessionContext";
import { useNavigate } from "react-router-dom";
import WishlistFrontEndSevice from "../services/storefront/wishlistFrontEndSevice";
import LoginCard from "../components/Login-Card/LoginCard";
import MediaFrontEndService from "../services/storefront/mediaFrontEndService";
import MediaHistoryFrontEndService from "../services/storefront/mediaHistoryFrontEndService";

const AccountPage = () => {
  const mediaFrontEndService = new MediaFrontEndService();
  const wishlistFrontEndSevice = new WishlistFrontEndSevice();
  const mediaHistoryFrontEndService = new MediaHistoryFrontEndService();
  const { user } = useContext(SessionContext) || {};
  const [wishlistItems, setWishlistItems] = useState([]);
  const navigate = useNavigate();

  // load user wishlist
  useEffect(() => {
    if (!user) return;
    const loadData = async () => {
      try {
        const stockData = await wishlistFrontEndSevice.get("/readRecords", {
          MemberID: user.MemberID,
        });
        const availabilityResults = await Promise.all(
          stockData.data.map(async (mediaItem) => {
            const availability = await mediaHistoryFrontEndService.get(
              "/readRecords",
              { MediaID: mediaItem.MediaID }
            );
            const activeStatus = !!(availability?.data?.[0]?.Active) ?? false;
            return { ...mediaItem, available: activeStatus };
          })
        );
        setWishlistItems(availabilityResults || {});
      } catch (error) {
        console.error("Error fetching wishlist data:", error);
      }
    };

    loadData();
  }, [user]);

  const handleRemove = (itemToRemove) => {
    const RemoveData = async () => {
      try {
        const response = await wishlistFrontEndSevice.delete("/deleteRecord", {
          WishlistID: itemToRemove.WishlistID,
        });
        setWishlistItems((prevItems) =>
          prevItems.filter(
            (item) => item.WishlistID !== itemToRemove.WishlistID
          )
        );
      } catch (error) {
        console.error("Error removing wishlist data:", error);
      }
    };

    RemoveData();
  };

  const handleReserve = (itemToReserve) => {
    const UpdateData = async () => {
      try {
        const response = await wishlistFrontEndSevice.put("/updateRecord", {
          WishlistID: itemToReserve.WishlistID,
          WishType: "Reservation",
        });
        setWishlistItems((prevItems) =>
          prevItems.map((item) =>
            item.WishlistID === itemToReserve.WishlistID
              ? { ...item, WishType: "Reservation" }
              : item
          )
        );
      } catch (error) {
        console.error("Error Updating wishlist data:", error);
      }
    };

    UpdateData();
  };

  const handleRent = (itemToRent) => {
    const state = { mediaType: itemToRent.Type, mediaTitle: itemToRent.Title };
    navigate("/media", { state });
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
                    const mediaArtwork = mediaFrontEndService.generateImageSrc(
                      item.Title,
                      item.Type
                    );
                    const reservation = item.WishType === "Reservation";
                    const isAvailable = item.available;

                    return (
                      <tr key={index} style={{ verticalAlign: "middle" }}>
                        {/* Product */}
                        <td>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "3rem",
                            }}
                          >
                            <div>
                              <Button
                                variant="danger"
                                onClick={() => handleRemove(item)}
                              >
                                X
                              </Button>
                            </div>
                            <div style={{ flex: "0 0 auto" }}>
                              <img
                                src={mediaArtwork}
                                alt="Media Artwork"
                                style={{
                                  height: "7rem",
                                  aspectRatio: "1",
                                  objectFit: "contain",
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
                          {!isAvailable && !reservation ? (
                            <Button
                              className="button-secondary-outline"
                              onClick={() => handleReserve(item)}
                              title="Reserve Media"
                            >
                              <i className="bi bi-calendar-plus"></i>
                            </Button>
                          ) : reservation ? (
                            <span
                              className="highlight-orange-outline"
                              title="In Queue For Media"
                            >
                              <i className="bi bi-clock-fill"></i>
                            </span>
                          ) : null}
                        </td>

                        {/* Rent */}
                        <td>
                          {isAvailable && !reservation ? (
                            <Button
                              className="button-primary"
                              onClick={() => handleRent(item)}
                              Title="Rent Media"
                            >
                              <i className="bi bi-plus-lg"></i>
                            </Button>
                          ) : (
                            <span
                              style={{ color: "red", paddingRight: "1rem" }}
                              Title="Out of stock"
                            >
                              <i className="bi bi-x-circle-fill"></i>
                            </span>
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
