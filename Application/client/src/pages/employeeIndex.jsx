import React, { useEffect, useState, useContext } from 'react';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import MediaPagination from '../components/MediaPagination';
import mediaFrontEndService from '../services/storefront/mediaFrontEndService';
import { Link } from 'react-router-dom';
import { Container, Table, Button, Form } from 'react-bootstrap';
import { SessionContext } from '../services/sessionContext';
import branchFrontEndService from '../services/storefront/branchFrontEndService';

const EmployeeIndexPage = () => {
  const [searchMedia, setSearchMedia] = useState([]);
  const [searchPK, setSearchPK] = useState('');
  const [searchTitle, setSearchTitle] = useState('');
  const { branches } = useContext(SessionContext) || {};

  const today = new Date();
  const startDate = today.toLocaleDateString('en-GB').split('/').join('-');

  // Load media data
  useEffect(() => {
    async function loadData() {
      const searchItems = await mediaFrontEndService.get('/readRecords', { MediaID: searchPK });
      setSearchMedia(searchItems.data);
    }

    loadData();
  }, [searchPK]);

  useEffect(() => {
    async function loadData() {
      const searchItems = await mediaFrontEndService.get('/readRecords', { Title: searchTitle }, true);
      setSearchMedia(searchItems.data);
    }

    loadData();
  }, [searchTitle]);

  useEffect(() => {
    
  }, [])

  const handlePKInputChange = async (e) => {
    const value = e.target.value;
    setSearchPK(value);
  }

  const handleTitleInputChange = async (e) => {
    const value = e.target.value;
    setSearchTitle(value);
  }

  const calculateReturnDate = (rentLength) => {
    const returnDateObj = new Date(today);
    returnDateObj.setDate(returnDateObj.getDate() + rentLength);
    return returnDateObj.toLocaleDateString('en-GB').split('/').join('-');
  };

  const adjustRentLength = (index, adjustment) => {
    
  };

  async function getBranchInfo(branchID) {
    const branchInfo = await branchFrontEndService.get('/readRecords', {BranchID: branchID })

    return branchInfo.data;
  };

  return (
    <>
     <Container fluid="lg">
        <Row>
            <Row><Col><br></br></Col></Row>
            <Col className="d-flex justify-content-center">
                <Form className="d-flex align-items-center">
                <div className="search-wrapper">
                    <h1>Search by media ID</h1>
                    <Form.Control
                        type="text"
                        placeholder="Enter ID of item to be checked out..."
                        className="search-input"
                        value={searchPK}
                        onChange={handlePKInputChange}
                    />
                </div>
                </Form>
            </Col>
            <Col className="d-flex justify-content-center">
                <Form className="d-flex align-items-center">
                    <div className="search-wrapper">
                        <h1>Search by media title</h1>
                        <Form.Control
                            type="text"
                            placeholder="Enter title of media to search for..."
                            className="search-input"
                            value={searchTitle}
                            onChange={handleTitleInputChange}
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
                        const branch = getBranchInfo(item.BranchID);
                        console.log("Branch: ", branch);
                        const mediaArtwork = mediaFrontEndService.generateImageSrc(item.Title, item.Type);
                        const rentLength = item.rentLength || 7;
                        const returnDate = calculateReturnDate(rentLength);
                        const isMinimumTerm = rentLength <= 7;
                        const tokens = Math.ceil(rentLength / 7);
  
                        return (
                            <tr key={index} style={{ verticalAlign: 'middle' }}>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
                                        {/* Column 1: Remove */}
  
                                        {/* Column 2: Image */}
                                        <div style={{ flex: '0 0 auto' }}>
                                            <img
                                                src={mediaArtwork}
                                                alt="Media Artwork"
                                                style={{
                                                height: '10rem',
                                                aspectRatio: '1',
                                                objectFit: 'contain',
                                                }}
                                            />
                                        </div>
  
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
                                    <p>Collect In Store</p>
                                </td>
  
                                <td>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
                                        {tokens} Tokens
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            <div style={{ textAlign: 'right' }}>
                <h4>
                    Total: {searchMedia.reduce((acc, item) => acc + (Math.ceil(item.rentLength / 7) || 1), 0)} Tokens
                </h4>
            </div>
            </div>
            </Col>
        </Row>
        <br></br>
      </Container>
    </>
  );
};

export default EmployeeIndexPage;