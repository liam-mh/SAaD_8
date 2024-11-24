import React, { useContext, useEffect } from 'react';
import LoginCard from '../components/LoginCard';
import { Button, Container, Row, Col, Table } from 'react-bootstrap';
import { SessionContext } from '../services/sessionContext';

const CheckoutPage = () => {
  const { user, checkout } = useContext(SessionContext) || {}; 
  return (
    <Container fluid='lg'>
      <h1>Checkout</h1>
      <Row>
        <Col>
          <h4 id="details">Your Details</h4>
          {!user ? (
            <LoginCard />
          ) : (
            <div className='content-panel'>
              <Row>
                <Col>
                  <span>
                    <strong>Account Details</strong><br />
                    Name: {[user.FirstName || 'Firstname', ' ', user.Surname || 'Surname']}<br />
                    Email: {user.Email}
                  </span>
                  <br />
                  <br />
                  <span>
                    <strong>Home Address</strong><br />
                    {user.FirstLineAddress || 'First Line Address'}<br />
                    {user.City || 'City'}<br />
                    {user.Postcode || 'Postcode'}<br />
                  </span>
                </Col>
                <Col style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                  <Button className='button-primary-outline'>
                    Edit Account
                  </Button>
                </Col>
              </Row>
            </div>
          )}
          <h4 id="order" className='mt-3'>Order Summary</h4>
          <div className='content-panel mb-3'>
            <Table hover className="aml-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Rent Details</th>
                </tr>
              </thead>
              <tbody>
                {checkout.map((item, index) => {
                  const deliveryMessage = item.deliveryOption === 'collect'
                    ? `In-Store Collection, ${item.branch.Postcode}`
                    : `Home Delivery, ${user?.Postcode || 'Unknown Address'}`;

                  return (
                    <tr key={index} style={{ verticalAlign: 'middle' }}>
                      <td>
                        <span>
                          <strong>{item.Title}</strong><br />
                          Format: {item.Type}<br />
                          Subtotal: {item.tokens}
                        </span>
                      </td>
                      <td>
                        <span>
                          Start: {item.startDate}<br />
                          Return: {item.returnDate}<br />
                          Delivery: {deliveryMessage}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>          
            </Table>
          </div>
        </Col>
        <Col>
          <h4 id="payment">Payment</h4>
          <div className='content-panel mb-3'>
            <Row>
              <Col style={{textAlign: 'center'}}>
                <Row>
                  <span><strong>Tokens Remaining</strong></span>
                </Row>
                <Row>
                  <span className='highlight-primary-outline' style={{width: '3rem'}}>{'5'}</span>
                </Row>
              </Col>
              <Col style={{textAlign: 'center'}}>
              
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutPage;