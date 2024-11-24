import React, { useContext, useState } from 'react';
import LoginCard from '../components/LoginCard';
import { Button, Container, Row, Col, Table } from 'react-bootstrap';
import { SessionContext } from '../services/sessionContext';
import { Link } from 'react-router-dom';
import PaymentCard from '../components/PaymentCard';

const CheckoutPage = () => {
  const { user, checkout } = useContext(SessionContext) || {}; 
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const subscriptionPayment = true; 
  const total = checkout.reduce((acc, item) => acc + (item.tokens || 0), 0);

  const handleSelectedPaymentMethod = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handlePayment = () => {

    if (!user) {
      alert("Please log in to proceed with payment.");
      return;
    }
    if (subscriptionPayment && !selectedPaymentMethod) {
      alert("Please select a payment method.");
      return;
    }
    const paymentMethod = subscriptionPayment ? selectedPaymentMethod : 'token';

    const transaction = {
      user,
      checkout,
      paymentMethod,
      total
    };

    console.log('Transaction: ', transaction);
  };

  return (
    <Container fluid='lg'>
      <h1>Checkout</h1>
      <Row>
        <Col>

          {/* Account and Login */}    
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
                  <Button className='button-primary-outline' as={Link} to='/account#account'>
                    Edit Account
                  </Button>
                </Col>
              </Row>
            </div>
          )}

          {/* Order Summary */}    
          <h4 id="order" className='mt-3'>Order Summary</h4>
          <div className='content-panel'>
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
            <div style={{ textAlign: 'right' }}>
              <Button className='button-primary-outline' as={Link} to="/basket">
                Edit Basket
              </Button>
            </div>
          </div>
        </Col>

        <Col>
          {/* Payment */}        
          <h4 id="payment">Payment</h4>
          <div className='content-panel'>
            <Row style={{ textAlign: 'center' }}>
              <Col>
                <span><strong>Tokens Remaining</strong></span>
              </Col>
              <Col>
                <span><strong>Refresh Date</strong></span>
              </Col>
            </Row>
            <Row style={{ textAlign: 'center', marginTop: '0.5rem' }}>
              <Col>
                <span className='highlight-primary-outline'>{'5'}</span>
              </Col>
              <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'var(--primary)' }}>{'11-11-2024'}</span>
              </Col>
            </Row>
          </div>

          {/* Subscription Payment */}  
          {subscriptionPayment && (
            <Row className='g-0 mt-4'>
              <PaymentCard onSelectPaymentMethod={handleSelectedPaymentMethod} />
            </Row>
          )}

          {/* Payment Bar */} 
          <Row className='g-0 pt-4'>
            <Button onClick={handlePayment} className='button-primary mb-4' style={{ width: '100%', boxShadow: 'var(--drop-shadow)' }}>
              Pay Total: {total}
            </Button>
            <span>
              For more information on payments and media rental policies, click{" "}
              <Link to="/help#rerturn-policy">here</Link>
            </span>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutPage;