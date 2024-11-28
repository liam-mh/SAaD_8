import React, { useEffect, useState, useContext } from 'react';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { Link } from 'react-router-dom';
import { Container, Table, Button, Form } from 'react-bootstrap';
import { SessionContext } from '../services/sessionContext';
import mediaFrontEndService from '../services/storefront/mediaFrontEndService';
import branchFrontEndService from '../services/storefront/branchFrontEndService';
import memberFrontEndService from '../services/account/memberFrontEndService';
import mediaHistoryFrontEndService from '../services/storefront/mediaHistoryFrontEndService';


const EmployeeIndexPage = () => {
  const [searchMedia, setSearchMedia] = useState([]);
  const [searchPK, setSearchPK] = useState('');
  const [searchTitle, setSearchTitle] = useState('');
  const { basket, setBasket } = useContext(SessionContext) || {};
  const [deliveryOptions, setDeliveryOptions] = useState(basket.map(() => 'collect'));
  const [uniqueTitles, setUniqueTitles] = useState(false);
  const [searchEmail, setSearchEmail] = useState('');
  const [user, setUserDetails] = useState(['', '']);

  const today = new Date();
  const startDate = today.toLocaleDateString('en-GB').split('/').join('-');

  const handleSearch = async () => {
    try {
        if (searchPK) {
            const searchItems = await mediaFrontEndService.get('/readRecords', { MediaID: searchPK });
            const mediaWithBranch = await getBranchInfo(searchItems.data);
            await getMediaAvailability(mediaWithBranch);
            setSearchPK('');
            return console.log("Search by primary key successful.");
        }
        if (searchTitle) {
            const searchItems = await mediaFrontEndService.get('/readRecords', { Title: searchTitle }, uniqueTitles);
            const mediaWithBranch = await getBranchInfo(searchItems.data);
            await getMediaAvailability(mediaWithBranch);
            setSearchTitle('');
            return console.log("Search by title successful.");
        }
        console.warn('No valid search parameters provided.');
    }
    catch (error) {
        console.error('Error during search: ', error);
    }
  }

  const getBranchInfo = async (mediaItems) => {
    try {
        const mediaWithBranches = await Promise.all(
            mediaItems.map(async (media) => {
                try {
                    const branchResponse = await branchFrontEndService.get('/readRecords', { BranchID: media.BranchID });
                    const branchInfo = branchResponse.data[0];
                    return { ...media, branch: branchInfo };
                } catch (error) {
                    console.error(`Error fetching branch data for BranchID ${media.BranchID}: `, error);
                    return { ...media, branch: null };
                }
            })
        );
        setSearchMedia(mediaWithBranches);
        return mediaWithBranches;
    } catch (error) {
        console.error("Error fetching media items with branch data: ", error);
    }
  }

  const getMediaAvailability = async (mediaItems) => {
    try {
        const mediaWithAvailability = await Promise.all(
            mediaItems.map(async (media) => {
                try {
                    const mediaHistoryRes = await mediaHistoryFrontEndService.get('/readRecords', { MediaID: media.MediaID });
                    var available = mediaHistoryRes.data[0];
                    (!available) ? available = 0 : available = 1;
                    return { ...media, availability: available };
                } catch (error) {
                    console.error(`Error fetching availability for MediaID ${media.MediaID}: `, error);
                }
            })
        );
        setSearchMedia(mediaWithAvailability);
    } catch (error) {
        console.error("Error fetching media items with availability: ", error);
    }
  }

  const fetchUserData = async () => {
    try {
        const userData = await memberFrontEndService.get('/readRecords', { Email: searchEmail });
        if (!userData.data[0]) {
            userData.data[0] = '';
            userData.data[1] = '';
        }
        else {
            var convertedDate = new Date(userData.data[0].RegisterDate);
            convertedDate = convertedDate.toLocaleDateString('en-GB').split('/').join('-');
            userData.data[0].RegisterDate = convertedDate;
        }
        
        const userBranch = await fetchUserBranch(userData.data[0].BranchID);
        userData.data.push(userBranch.data[0]);
        setUserDetails(userData.data);
    } catch (error) {
        console.error('Error during search: ', error);
    }
  }

  const fetchUserBranch = async (userBranchID) => {
    try {
        const branchData = await branchFrontEndService.get('/readRecords', { BranchID: userBranchID });
        return branchData;
    } catch (error) {
        console.error("Error fetching user's branch data: ", error);
        return null;
    }
  }

  const handleCheckout = async () => {
    /* 
    Needs to:
    Bring up confirmation box - Yes / No
    No - closes confirmation box, no data change
    Yes:
        Subtracts total tokens from user
        Create record in MediaHistory with
            MediaID, MemberID, BranchID, EmployeeID, Active (tinyint - 1), RentStart (startDate), RentEnd (returnDate), ActualReturn (null)
        Clears basket

    Search function also needs to be updated to check MediaHistory table for record with field Active 1
        If active record, mark item as unavailable
    */
  }

  const calculateReturnDate = (rentLength) => {
    const returnDateObj = new Date(today);
    returnDateObj.setDate(returnDateObj.getDate() + rentLength);
    return returnDateObj.toLocaleDateString('en-GB').split('/').join('-');
  };

  const adjustRentLength = (item, adjustment) => {
    const updatedMedia = searchMedia.map(mediaItem => {
        if (mediaItem.MediaID === item.MediaID) {
            return {
                ...mediaItem,  // Copy all properties of the item
                rentLength: mediaItem.rentLength + adjustment // Adjust rentLength
            };
        }
        return mediaItem; // If it's not the item we're looking for, just return it unchanged
    });

    // Update the state with the new media list
    setSearchMedia(updatedMedia);
  };

  const isInBasket = (mediaID) => basket.some(item => 
        item.MediaID === mediaID
    );

    const handleAddToBasket = (e, item) => {
        e.preventDefault();

        if (!isInBasket(item.MediaID)) {
            setBasket([...basket, item]);
        };
    }

    const isAvailable = (availability) => {
        return (availability === 1) ? false : true;
    }

    const handleRemoveFromBasket = (e, itemToRemove) => {
        e.preventDefault();
        const updatedBasket = basket.filter(
          (item) =>
            item.MediaID !== itemToRemove.MediaID
        );
        setBasket(updatedBasket);
    };

  const handlePKInputChange = async (e) => {
    const value = e.target.value;
    setSearchPK(value);
  }

  const handleTitleInputChange = async (e) => {
    const value = e.target.value;
    setSearchTitle(value);
  }

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
     <Container fluid="lg">
     <Row><Col><br /></Col></Row>
        <Row>
            {/* User info */}
            <div className='content-panel'>
                <Col className="justify-content-center">
                    <br />
                    <h4><b>Enter user's email address</b></h4>
                    <Form className="d-flex align-items-center">
                    <div className="search-wrapper d-flex">
                    <Form.Control
                        type="text"
                        placeholder="jane.doe@example.com"
                        className="search-input"
                        value={searchEmail}
                        onChange={handleEmailInputChange}
                    />
                    <Button className="button-secondary me-2" style={{ borderRadius: '0 5px 5px 0' }} onClick={ fetchUserData }>Search</Button>
                    </div>
                    </Form>
                </Col>
                <br />
                <Row>
                  <Col className="d-flex">
                    <span>
                      <strong>Account Details</strong><br />
                      Name: <br /> {[user[0].FirstName || 'Firstname', ' ', user[0].Surname || 'Surname']}<br />
                      Email: <br /> {user[0].Email || 'Email address'}
                    </span>
                  </Col>
                  <Col classsName="d-flex"><br />
                    Register Date: <br /> {user[0].RegisterDate}
                  </Col>
                </Row>
                    <br />
                    <br />
                <Row>
                  <Col>
                    <span>
                      <strong>Home Address</strong><br />
                      {user[0].FirstLineAddress || 'First Line Address'}<br />
                      {user[0].City || 'City'}<br />
                      {user[0].Postcode || 'Postcode'}<br />
                    </span>
                  </Col>
                  <Col>
                    <span>
                        <strong>Current Branch</strong><br />
                        {user[1].FirstLineAddress || 'First Line Address'}<br />
                        {user[1].City || 'City'}<br />
                        {user[1].Postcode || 'Postcode'}<br />
                    </span>
                  </Col>
                </Row>
            </div>
            {/* User's basket */}
            <Col>
                <div className='content-panel' style={{ height: '46vh', overflowY: 'auto' }}>
                    <h4 id="order" className='mt-3'>Order Summary</h4>
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
                            const deliveryMessage = item.deliveryMethod === 'collect'
                            ? `In-Store Collection from ${item.branch.Postcode}`
                            : `Home Delivery to ${user[0].Postcode || 'Unknown Address'}`;
                            return (
                                <tr key={index} style={{ verticalAlign: 'middle' }}>
                                    <td>
                                        <div>
                                            <Button variant="danger" onClick={(e) => handleRemoveFromBasket(e, item)}>
                                                X
                                            </Button>
                                        </div>
                                    </td>
                                    <td>
                                        <span>
                                            ID: {item.MediaID}<br />
                                            <strong>{item.Title}</strong><br />
                                            Format: {item.Type}<br />
                                            Subtotal: {item.tokens} tokens
                                        </span>
                                    </td>
                                    <td>
                                        <span>
                                            Start: {startDate}<br />
                                            Return: {item.returnDate}<br />
                                            Delivery: {deliveryMessage}
                                        </span>
                                    </td>
                                </tr>
                                );
                            })}
                        </tbody>          
                    </Table>
                    <div style={{ textAlign: 'right' }}>
                        <Button className='button-primary' as={Link} to="/basket">
                            Checkout User's Basket
                        </Button>
                    </div>
                </div>
            </Col>
        </Row>
        <Row>
            <Row><Col><br /></Col></Row>
            <Col className="justify-content-center">
                <h1>Search by media ID</h1>
                <Form className="d-flex align-items-center">
                <div className="search-wrapper d-flex">
                    <Form.Control
                        type="text"
                        placeholder="Enter media ID e.g. 54"
                        className="search-input"
                        value={searchPK}
                        onChange={handlePKInputChange}
                    />
                    <Button className="button-secondary me-2" style={{ borderRadius: '0 5px 5px 0' }} onClick={ handleSearch }>Search</Button>
                </div>
                </Form>
            </Col>
            <Col className="justify-content-center">
                <h1>Search by media title</h1>
                <Form className="align-items-center">
                    <div className="search-wrapper d-flex">
                        <Form.Control
                            type="text"
                            placeholder="Enter media title e.g. The Hobbit"
                            className="search-input"
                            value={searchTitle}
                            onChange={handleTitleInputChange}
                        />
                        <Button className="button-secondary me-2" style={{ borderRadius: '0 5px 5px 0' }} onClick={ handleSearch }>Search</Button>
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
        </Row>
        {/* Searched media */}
        <Row><Col><br /></Col></Row>
        <Row>
            <Col>
            <div className="content-panel" style={{maxheight: '60vh', overflow: 'auto'}}>
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
                        const deliveryMethod = deliveryOptions[index];

                        item = {
                            ...item,
                            rentLength,
                            returnDate,
                            tokens,
                            deliveryMethod
                        }
  
                        return (
                            <tr key={index} style={{ verticalAlign: 'middle' }}>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
                                        {/* Column 1: Title and Info */}
                                        <div>
                                            <span>ID: {mediaID}</span><br />
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
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <Button
                                        className="button-primary mb-3"
                                        style={{ width: '3rem' }}
                                        onClick={() => adjustRentLength(item, 7)}
                                        >
                                            + 7
                                        </Button>
                                        {returnDate}
                                        <Button
                                        className="button-primary-outline mt-3"
                                        style={{ width: '3rem' }}
                                        onClick={() => !isMinimumTerm && adjustRentLength(item, -7)}
                                        disabled={isMinimumTerm}
                                        >
                                            - 7
                                        </Button>
                                    </div>
                                </td>
  
                                <td>
                                    {/* Column 4: Branch Info*/}
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <span>{branch.FirstLineAddress || 'First Line'}</span>
                                        <span>{branch.City || 'City'}</span>
                                        <span>{branch.Postcode || 'Postcode'}</span>
                                    </div>
                                </td>
  
                                <td>
                                    {/* Column 5: Delivery Options */}
                                    <Form.Select
                                        className="form-secondary"
                                        value={deliveryOptions[index]}
                                        onChange={(e) => handleDeliveryChange(index, e.target.value)}
                                        required
                                    >
                                    <option value="collect">Collect In-Store</option>
                                    <option value="delivery">Home Delivery</option>
                                    </Form.Select>
                                </td>
  
                                <td>
                                    {/* Column 6: Token Cost */}
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'middle' }}>
                                        {tokens} Tokens
                                    </div>
                                </td>

                                <td>
                                    {/* Column 7: Basket/Unavailble Button */}
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'middle' }}>
                                        {!isAvailable(item.availability) ? (
                                            <Button className='btn-danger'>
                                                Unavailable
                                            </Button>
                                        ) : !isInBasket(item.MediaID) ? (
                                            <button className="button-primary" onClick={(e) => handleAddToBasket(e, item)}>
                                                Add to Basket
                                            </button>
                                        ) : (
                                            <button className="button-secondary" onClick={(e) => handleRemoveFromBasket(e, item)}>
                                                Remove from Basket
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
        <br></br>
      </Container>
    </>
  );
};

export default EmployeeIndexPage;