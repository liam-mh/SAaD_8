import React, { useEffect, useState, useContext } from 'react';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import mediaFrontEndService from '../services/storefront/mediaFrontEndService';
import { Link } from 'react-router-dom';
import { Container, Table, Button, Form } from 'react-bootstrap';
import { SessionContext } from '../services/sessionContext';
import branchFrontEndService from '../services/storefront/branchFrontEndService';
import memberFrontEndService from '../services/account/memberFrontEndService';


const EmployeeIndexPage = () => {
  const [searchMedia, setSearchMedia] = useState([]);
  const [searchPK, setSearchPK] = useState('');
  const [searchTitle, setSearchTitle] = useState('');
  const { basket, setBasket, branches, setCheckout } = useContext(SessionContext) || {};
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
            await getBranchInfo(searchItems.data);
            setSearchPK('');
            return console.log("Search by primary key successful.");
        }
        if (searchTitle) {
            const searchItems = await mediaFrontEndService.get('/readRecords', { Title: searchTitle }, uniqueTitles);
            await getBranchInfo(searchItems.data);
            setSearchTitle('');
            return console.log("Search by title successful.");
        }
        console.warn('No valid search parameters provided.');
    }
    catch (error) {
        Console.error('Error during search: ', error);
    }
  }

  const getBranchInfo = async (mediaItems) => {
    const mediaWithBranches = await Promise.all(
        mediaItems.map(async (media) => {
            const branchResponse = await branchFrontEndService.get('/readRecords', { BranchID: media.BranchID });
            const branchInfo = branchResponse.data[0];
            return { ...media, branch: branchInfo };
        })
    );
    setSearchMedia(mediaWithBranches);
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
    const branchData = await branchFrontEndService.get('/readRecords', { BranchID: userBranchID });
    
    return branchData;
  }

  const calculateReturnDate = (rentLength) => {
    const returnDateObj = new Date(today);
    returnDateObj.setDate(returnDateObj.getDate() + rentLength);
    return returnDateObj.toLocaleDateString('en-GB').split('/').join('-');
  };

  const adjustRentLength = (index, adjustment) => {
    
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
    setDeliveryOptions((prevOptions) =>
      prevOptions.map((option, i) => (i === index ? value : option))
    );
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
            <div className='content-panel'>
                <Col className="justify-content-center">
                    <h1>Enter user's email address</h1>
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
            <Col>
                <div>
                    
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
        <Row><Col><br></br></Col></Row>
        <Row>
            <Col>
            <div className="content-panel">
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
                        const branch = item.branch;
                        const rentLength = item.rentLength || 7;
                        const returnDate = calculateReturnDate(rentLength);
                        const isMinimumTerm = rentLength <= 7;
                        const tokens = Math.ceil(rentLength / 7);
  
                        return (
                            <tr key={index} style={{ verticalAlign: 'middle' }}>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
                                        {/* Column 3: Title and Info */}
                                        <div>
                                            <strong>{item.Title}</strong>
                                            <br />
                                            <span>Type: {item.Type}</span>
                                            <br />
                                            <span>Rent tokens per week: 1</span>
                                        </div>
                                    </div>
                                </td>
  
                                <td>
                                    <span>{startDate}</span>
                                </td>
  
                                <td>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <Button
                                        className="button-primary mb-3"
                                        style={{ width: '3rem' }}
                                        onClick={() => adjustRentLength(index, 7)}
                                        >
                                            + 7
                                        </Button>
                                        {returnDate}
                                        <Button
                                        className="button-primary-outline mt-3"
                                        style={{ width: '3rem' }}
                                        onClick={() => !isMinimumTerm && adjustRentLength(index, -7)}
                                        disabled={isMinimumTerm}
                                        >
                                            - 7
                                        </Button>
                                    </div>
                                </td>
  
                                <td>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <span>{branch.FirstLineAddress || 'First Line'}</span>
                                        <span>{branch.City || 'City'}</span>
                                        <span>{branch.Postcode || 'Postcode'}</span>
                                    </div>
                                </td>
  
                                <td>
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
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'middle' }}>
                                        {tokens} Tokens
                                    </div>
                                </td>

                                <td>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'middle' }}>
                                        <Button
                                            className="button-primary mb-3"
                                            //onClick={ }
                                        > 
                                            Add to user's basket
                                        </Button>
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