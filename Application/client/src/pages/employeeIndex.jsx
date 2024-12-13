import React, { useEffect, useState, useContext } from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { Link } from "react-router-dom";
import { Container, Table, Button, Form } from "react-bootstrap";
import { SessionContext } from "../services/sessionContext";
import MediaFrontEndService from "../services/storefront/mediaFrontEndService";
import BranchFrontEndService from "../services/storefront/branchFrontEndService";
import MemberFrontEndService from "../services/account/memberFrontEndService";
import MediaHistoryFrontEndService from "../services/storefront/mediaHistoryFrontEndService";
import MemberSubscriptionFrontEndService from "../services/account/memberSubscriptionFrontEndService";
import EmailFrontEndService from "../services/notification/emailFrontEndService";
import LoginCard from "../components/Login-Card/LoginCard";
import WishlistFrontEndSevice from "../services/storefront/wishlistFrontEndSevice";
import moment from "moment";
import MemberAccountDetails from "../components/Member-Account-Details/MemberAccountDetails";
import MemberMediaHistory from "../components/Member-Media-History/MemberMediaHistory";

const EmployeeIndexPage = () => {
  const mediaFrontEndService = new MediaFrontEndService();
  const branchFrontEndService = new BranchFrontEndService();
  const memberFrontEndService = new MemberFrontEndService();
  const mediaHistoryFrontEndService = new MediaHistoryFrontEndService();
  const memberSubscriptionFrontEndService =
    new MemberSubscriptionFrontEndService();
  const emailFrontEndService = new EmailFrontEndService();
  const wishlistFrontEndSevice = new WishlistFrontEndSevice();
  const [searchMedia, setSearchMedia] = useState([]);
  const [searchPK, setSearchPK] = useState("");
  const [historyID, setHistoryID] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const { basket, setBasket, clearBasket } = useContext(SessionContext) || {};
  const [deliveryOptions, setDeliveryOptions] = useState(
    basket.map(() => "collect")
  );
  const [employee, setEmployee] = useState(false);
  const [uniqueTitles, setUniqueTitles] = useState(false);
  const [searchEmail, setSearchEmail] = useState("");
  const [user, setUserDetails] = useState(["", ""]); // user[0] = user data, user[1] = branch data
  const [totalTokenCost, setTotalTokenCost] = useState(0);
  const [confirmation, setConfirmation] = useState(false);
  const [transactionID, setTransactionID] = useState(null);
  const [userMediaHistory, setUserMediaHistory] = useState([]);

  const today = new Date();
  const startDate = today.toLocaleDateString("en-GB").split("/").join("-");

  useEffect(() => {
    var totalTokens = 0;
    basket.map((item) => {
      totalTokens += item.tokens;
    });
    setTotalTokenCost(totalTokens);
  }, [basket]);

  const handleSearch = async () => {
    try {
      if (searchPK) {
        const searchItems = await mediaFrontEndService.get("/readRecords", {
          MediaID: searchPK,
        });
        const mediaWithBranch = await getBranchInfo(searchItems.data);
        await getMediaAvailability(mediaWithBranch);
        setSearchPK("");
        return console.log("Search by primary key successful.");
      }
      if (searchTitle) {
        const searchItems = await mediaFrontEndService.get(
          "/readRecords",
          { Title: searchTitle },
          uniqueTitles
        );
        const mediaWithBranch = await getBranchInfo(searchItems.data);
        await getMediaAvailability(mediaWithBranch);
        setSearchTitle("");
        return console.log("Search by title successful.");
      }
      console.warn("No valid search parameters provided.");
    } catch (error) {
      console.error("Error during search: ", error);
    }
  };

  const returnMedia = async () => {
    if (historyID) {
      const returnedMedia = await mediaHistoryFrontEndService.put(
        "/updateRecord",
        {
          HistoryID: historyID,
          Active: 0,
          ActualReturn: moment().format("YYYY-MM-DD"),
        }
      );
      if (returnedMedia.status === 200) {
        const wishlist = await wishlistFrontEndSevice.get("/readRecords", {
          Title: returnedMedia.data.Title,
          Type: returnedMedia.data.Type,
        });
        if (wishlist.data.length > 0) {
          const member = await memberFrontEndService.handleMembersWishlist(
            wishlist.data
          );
        }
      }
    }
  };

  const getBranchInfo = async (mediaItems) => {
    try {
      const mediaWithBranches = await Promise.all(
        mediaItems.map(async (media) => {
          try {
            const branchResponse = await branchFrontEndService.get(
              "/readRecords",
              { BranchID: media.BranchID }
            );
            const branchInfo = branchResponse.data[0];
            return { ...media, branch: branchInfo };
          } catch (error) {
            console.error(
              `Error fetching branch data for BranchID ${media.BranchID}: `,
              error
            );
            return { ...media, branch: null };
          }
        })
      );
      setSearchMedia(mediaWithBranches);
      return mediaWithBranches;
    } catch (error) {
      console.error("Error fetching media items with branch data: ", error);
    }
  };

  const getMediaAvailability = async (mediaItems) => {
    try {
      const mediaWithAvailability = await Promise.all(
        mediaItems.map(async (media) => {
          try {
            const mediaHistoryRes = await mediaHistoryFrontEndService.get(
              "/readRecords",
              { MediaID: media.MediaID }
            );
            let available = mediaHistoryRes?.data?.[0]?.Active || 0;
            return { ...media, availability: available };
          } catch (error) {
            console.error(
              `Error fetching availability for MediaID ${media.MediaID}: `,
              error
            );
          }
        })
      );
      setSearchMedia(mediaWithAvailability);
    } catch (error) {
      console.error("Error fetching media items with availability: ", error);
    }
  };

  const fetchUserData = async () => {
    try {
      const userData = await memberFrontEndService.get("/readRecords", {
        Email: searchEmail,
      });
      console.log(userData);
      if (!userData) {
        alert('No member with that email');
        userData.data[0] = "";
        userData.data[1] = "";
        return;
      } else {
        var convertedDate = new Date(userData.data[0].RegisterDate);
        convertedDate = convertedDate
          .toLocaleDateString("en-GB")
          .split("/")
          .join("-");
        userData.data[0].RegisterDate = convertedDate;
      }
      const userBranch = await fetchUserBranch(userData.data[0].BranchID);
      userData.data.push(userBranch.data[0]);
      setUserDetails(userData.data);

      const userMediaHistory = await mediaHistoryFrontEndService.get("/readRecords", {
        MemberID: userData.data[0].MemberID,
      });
      setUserMediaHistory(userMediaHistory.data);
    } catch (error) {
      console.error("Error during search: ", error);
    }
  };

  const fetchUserBranch = async (userBranchID) => {
    try {
      const branchData = await branchFrontEndService.get("/readRecords", {
        BranchID: userBranchID,
      });
      return branchData;
    } catch (error) {
      console.error("Error fetching user's branch data: ", error);
      return null;
    }
  };

  const handleCheckout = async () => {
    const empConfirmed = window.confirm(
      `Are you sure you would like to checkout this basket to the user ${user[0].FirstName} ${user[0].Surname}?`
    );
    if (empConfirmed) {
      console.log("Basket checked out.");

      basket.map(async (item) => {
        try {
          const startDateFormatted = formatDateForDB(startDate);
          const returnDateFormatted = formatDateForDB(item.returnDate);
          const res = await mediaHistoryFrontEndService.post("/createRecord", {
            MediaID: item.MediaID,
            MemberID: user[0].MemberID,
            BranchID: item.branch.BranchID,
            EmployeeID: employee.EmployeeID,
            Active: 1,
            RentStart: startDateFormatted,
            RentEnd: returnDateFormatted,
            ActualReturn: null,
          });
          console.log(res);
        } catch (error) {
          console.error("Error while writing to media history table: ", error);
        }
      });

      await calculateMemberTokens();
      await generateEmail();
    } else {
      console.log("Checkout canceled.");
    }
  };

  const calculateMemberTokens = async () => {
    try {
      const memberID = user[0].MemberID;
      const memberSubResponse = await memberSubscriptionFrontEndService.get(
        "/readRecords",
        { MemberID: memberID }
      );
      const memberTokens = memberSubResponse.data[0].RemainingTokens;

      if (memberTokens >= totalTokenCost) {
        const remainingTokens = memberTokens - totalTokenCost;
        await memberSubscriptionFrontEndService.put("/updateRecord", {
          MemberID: memberID,
          RemainingTokens: remainingTokens,
        });
        return remainingTokens;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error calculating remaining tokens: ", error);
    }
  };

  const formatDateForDB = (date) => {
    const [day, month, year] = date.split("-");

    return `${year}-${month}-${day}`;
  };

  const generateTransactionID = () => {
    return user[0].MemberID + "-" + Date.now();
  };

  const generateEmail = async () => {
    const newTransactionID = generateTransactionID();
    setTransactionID(newTransactionID);

    // Construct the plain-text order summary
    const orderSummary = basket
      .map((item, index) => {
        const deliveryMessage =
          item.deliveryMethod === "collect"
            ? `In-Store Collection, ${item.branch.Postcode}`
            : `Home Delivery, ${user[0].Postcode || "Unknown Address"}`;

        return `
        Media Title: ${item.Title}
        Format: ${item.Type}
        Subtotal: ${item.tokens} tokens
        Start Date: ${startDate}
        Return Date: ${item.returnDate}
        Delivery: ${deliveryMessage}
        `;
      })
      .join("\n\t--------------------------\n");

    try {
      await emailFrontEndService.post("/send", {
        to: user[0].Email, // put in personal to test
        subject: "AML Transaction Confirmation",
        message: `
            Hi ${user[0].FirstName},
    
            Here is your order confirmation #${newTransactionID}
    
            Order Summary:
            --------------------------
            ${orderSummary}
            --------------------------
            Total: ${totalTokenCost}
            Payment Method: Subscription
    
            Thank you for using the Advanced Media Library!
            `,
      });
    } catch (error) {
      console.error("Error when sending email: ", error);
    }

    clearBasket();
    setConfirmation(true);
  };

  const calculateReturnDate = (rentLength) => {
    const returnDateObj = new Date(today);
    returnDateObj.setDate(returnDateObj.getDate() + rentLength);
    return returnDateObj.toLocaleDateString("en-GB").split("/").join("-");
  };

  const adjustRentLength = (item, adjustment) => {
    const updatedMedia = searchMedia.map((mediaItem) => {
      if (mediaItem.MediaID === item.MediaID) {
        return {
          ...mediaItem, // Copy all properties of the item
          rentLength: mediaItem.rentLength + adjustment, // Adjust rentLength
        };
      }
      return mediaItem; // If it's not the item we're looking for, just return it unchanged
    });

    // Update the state with the new media list
    setSearchMedia(updatedMedia);
  };

  const isInBasket = (mediaID) =>
    basket.some((item) => item.MediaID === mediaID);

  const handleAddToBasket = (e, item) => {
    e.preventDefault();

    if (!isInBasket(item.MediaID)) {
      setBasket([...basket, item]);
    }
  };

  const isAvailable = (availability) => {
    return availability === 1 ? false : true;
  };

  const handleRemoveFromBasket = (e, itemToRemove) => {
    e.preventDefault();
    const updatedBasket = basket.filter(
      (item) => item.MediaID !== itemToRemove.MediaID
    );
    setBasket(updatedBasket);
  };

  const handlePKInputChange = async (e) => {
    const value = e.target.value;
    setSearchPK(value);
  };

  const handleHistoryIdChange = async (e) => {
    const value = e.target.value;
    setHistoryID(value);
  };

  const handleTitleInputChange = async (e) => {
    const value = e.target.value;
    setSearchTitle(value);
  };

  const handleDeliveryChange = (index, value) => {
    const updatedDeliveryOptions = [...deliveryOptions];
    updatedDeliveryOptions[index] = value;
    setDeliveryOptions(updatedDeliveryOptions);
  };

  const handleCheckboxChange = (e) => {
    setUniqueTitles(e.target.checked);
  };

  const handleEmailInputChange = (e) => {
    const value = e.target.value;
    setSearchEmail(value);
  };

  return (
    <>
      {/* Confirmation */}
      {confirmation && (
        <div
          id="confirmation"
          className="whats-new py-4 d-flex align-items-center justify-content-center"
        >
          <div className="content-panel" style={{ textAlign: "center" }}>
            <h4>Order Confirmation</h4>
            <p>
              Order placed successfully.
              <br />
              Here is {user[0].FirstName}'s order number:
            </p>
            <p>
              <strong>#{transactionID}</strong>
            </p>
          </div>
        </div>
      )}
      <Container fluid="lg">
        <h1 className="pb-2 pt-4">AML Employee</h1>
        {!employee ? (
          <LoginCard
            onLoginSuccess={(success) => {
              if (success) {
                setEmployee(true);
              }
            }}
          />
        ) : (
          <>
            {/* Member section */}
            <Row className="g-0">
              <h3>Member</h3>
              <Row className="g-0 pb-3">
                <span><strong>Enter members email address</strong></span>
                <Form className="d-flex align-items-center">
                    <div className="search-wrapper d-flex">
                      <Form.Control
                        type="text"
                        placeholder="jane.doe@example.com"
                        className="search-input"
                        value={searchEmail}
                        onChange={handleEmailInputChange}
                      />
                      <Button
                        className="button-secondary me-2"
                        style={{ borderRadius: "0 5px 5px 0" }}
                        onClick={fetchUserData}
                      >
                        Search Member
                      </Button>
                    </div>
                  </Form>
              </Row>
              {user[0]!="" && (
                <Row>
                  <Col className="p-0" style={{ paddingRight: "1.5rem" }}>
                      <MemberAccountDetails ID={user[0].MemberID}/>
                  </Col>
                  <Col style={{ paddingLeft: "1.5rem" }}>
                    <MemberMediaHistory ID={user[0].MemberID}/>
                  </Col>
                </Row>
              )}
            </Row>

            {/* Media section */}
            <Row >
              <h3 className="pt-3">Media</h3>
              <Col className="justify-content-center">
                <span><strong>Search by MediaID</strong></span>
                <Form className="d-flex align-items-center">
                  <div className="search-wrapper d-flex">
                    <Form.Control
                      type="text"
                      placeholder="Enter media ID e.g. 54"
                      className="search-input"
                      value={searchPK}
                      onChange={handlePKInputChange}
                    />
                    <Button
                      className="button-secondary me-2"
                      style={{ borderRadius: "0 5px 5px 0" }}
                      onClick={handleSearch}
                    >
                      Search
                    </Button>
                  </div>
                </Form>
              </Col>
              <Col className="justify-content-center">
                <span><strong>Search by Media title</strong></span>
                <Form className="align-items-center">
                  <div className="search-wrapper d-flex">
                    <Form.Control
                      type="text"
                      placeholder="Enter media title e.g. The Hobbit"
                      className="search-input"
                      value={searchTitle}
                      onChange={handleTitleInputChange}
                    />
                    <Button
                      className="button-secondary me-2"
                      style={{ borderRadius: "0 5px 5px 0" }}
                      onClick={handleSearch}
                    >
                      Search
                    </Button>
                  </div>
                  <div>
                    <label htmlFor="uniqueTitles">Unique Titles</label>
                    <input
                      type="checkbox"
                      name="uniqueTitles"
                      checked={uniqueTitles}
                      onChange={handleCheckboxChange}
                    />
                  </div>
                </Form>
              </Col>
              <Col className="justify-content-center">
                <span><strong>Return Media by HistoryID</strong></span>
                <Form className="d-flex align-items-center">
                  <div className="search-wrapper d-flex">
                    <Form.Control
                      type="text"
                      placeholder="Enter History ID"
                      className="search-input"
                      value={historyID}
                      onChange={handleHistoryIdChange}
                    />
                    <Button
                      className="button-secondary me-2"
                      style={{ borderRadius: "0 5px 5px 0" }}
                      onClick={returnMedia}
                    >
                      Return
                    </Button>
                  </div>
                </Form>
              </Col>
            </Row>

            {/* Searched media results */}
            <Row>
              <Col>
                <div
                  className="content-panel mt-3"
                  style={{ maxHeight: "75vh", overflow: "auto" }}
                >
                  <Table hover className="aml-table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Rent Start Date</th>
                        <th>Return Date</th>
                        <th>Store</th>
                        <th>Delivery Option</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {searchMedia.map((item, index) => {
                        if (!item.rentLength) {
                          item.rentLength = 7;
                        }
                        const mediaID = item.MediaID;
                        const branch = item.branch;
                        const rentLength = item.rentLength;
                        const returnDate = calculateReturnDate(rentLength);
                        const isMinimumTerm = rentLength <= 7;
                        const tokens = Math.ceil(rentLength / 7);
                        const deliveryMethod =
                          deliveryOptions[index] || "collect";

                        item = {
                          ...item,
                          rentLength,
                          returnDate,
                          tokens,
                          deliveryMethod,
                        };

                        return (
                          <tr key={index} style={{ verticalAlign: "middle" }}>
                            <td>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "3rem",
                                }}
                              >
                                {/* Column 1: Title and Info */}
                                <div>
                                  <span>ID: {mediaID}</span>
                                  <br />
                                  <strong>{item.Title}</strong>
                                  <br />
                                  <span>Type: {item.Type}</span>
                                  <br />
                                  <span>Rent tokens per week: 1</span>
                                </div>
                              </div>
                            </td>

                            <td>
                              {/* Column 2: Rent Start Date */}
                              <span>{startDate}</span>
                            </td>

                            <td>
                              {/* Column 3: Increase/Decrease Return Date + Display */}
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                }}
                              >
                                <Button
                                  className="button-primary mb-3"
                                  style={{ width: "3rem" }}
                                  onClick={() => adjustRentLength(item, 7)}
                                >
                                  + 7
                                </Button>
                                {returnDate}
                                <Button
                                  className="button-primary-outline mt-3"
                                  style={{ width: "3rem" }}
                                  onClick={() =>
                                    !isMinimumTerm && adjustRentLength(item, -7)
                                  }
                                  disabled={isMinimumTerm}
                                >
                                  - 7
                                </Button>
                              </div>
                            </td>

                            <td>
                              {/* Column 4: Branch Info*/}
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                }}
                              >
                                <span>
                                  {branch.FirstLineAddress || "First Line"}
                                </span>
                                <span>{branch.City || "City"}</span>
                                <span>{branch.Postcode || "Postcode"}</span>
                              </div>
                            </td>

                            <td>
                              {/* Column 5: Delivery Options */}
                              <Form.Select
                                className="form-secondary"
                                value={deliveryOptions[index]}
                                onChange={(e) =>
                                  handleDeliveryChange(index, e.target.value)
                                }
                                required
                              >
                                <option value="collect">Collect In-Store</option>
                                <option value="delivery">Home Delivery</option>
                              </Form.Select>
                            </td>

                            <td>
                              {/* Column 6: Token Cost */}
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "middle",
                                }}
                              >
                                {tokens} Tokens
                              </div>
                            </td>

                            <td>
                              {/* Column 7: Basket/Unavailble Button */}
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "middle",
                                }}
                              >
                                {!isAvailable(item.availability) ? (
                                  <span
                                    style={{ color: "red", paddingRight: "1rem" }}
                                    Title="Out of stock"
                                  >
                                    <i className="bi bi-x-circle-fill"></i>
                                  </span>
                                ) : !isInBasket(item.MediaID) ? (
                                  <button
                                    className="button-primary"
                                    onClick={(e) => handleAddToBasket(e, item)}
                                  >
                                    <i className="bi bi-basket"></i>
                                  </button>
                                ) : (
                                  <button
                                    className="button-secondary-outline"
                                    onClick={(e) =>
                                      handleRemoveFromBasket(e, item)
                                    }
                                  >
                                    <i className="bi bi-x-circle-fill"></i>
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </div>
              </Col>
            </Row>

            {/* Basket */}          
            <Row className="g-0">
              <h3 className="pt-3">Basket</h3>
              <div
                className="content-panel"
                style={{ height: "40vh", overflowY: "auto" }}
              >
                <h4 id="order" className="mt-3">
                  Order Summary
                </h4>
                <Table hover className="aml-table">
                  <thead>
                    <tr>
                      <th>Remove</th>
                      <th>Product</th>
                      <th>Rent Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {basket.map((item, index) => {
                      const deliveryMessage =
                        item.deliveryMethod === "collect"
                          ? `In-Store Collection from ${item.branch.Postcode}`
                          : `Home Delivery to ${
                              user[0].Postcode || "Unknown Address"
                            }`;
                      return (
                        <tr key={index} style={{ verticalAlign: "middle" }}>
                          <td>
                            <div>
                              <Button
                                variant="danger"
                                onClick={(e) => handleRemoveFromBasket(e, item)}
                              >
                                X
                              </Button>
                            </div>
                          </td>
                          <td>
                            <span>
                              ID: {item.MediaID}
                              <br />
                              <strong>{item.Title}</strong>
                              <br />
                              Format: {item.Type}
                              <br />
                              Subtotal: {item.tokens} tokens
                            </span>
                          </td>
                          <td>
                            <span>
                              Start: {startDate}
                              <br />
                              Return: {item.returnDate}
                              <br />
                              Delivery: {deliveryMessage}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
                {basket.length > 0 && (
                  <>
                    <div style={{ textAlign: "right" }}>
                      <h4>Total cost: {totalTokenCost} tokens</h4>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <Button className="button-primary" onClick={handleCheckout}>
                        Checkout User's Basket
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </Row>
          </>
        )}
      </Container>
    </>
  );
};

export default EmployeeIndexPage;
