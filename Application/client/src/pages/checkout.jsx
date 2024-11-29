import React, { useContext, useState, useEffect } from 'react';
import LoginCard from '../components/LoginCard';
import { Button, Container, Row, Col, Table } from 'react-bootstrap';
import { SessionContext } from '../services/sessionContext';
import { Link } from 'react-router-dom';
import PaymentCard from '../components/PaymentCard';

//Internal Service imports:
const mediaHistoryFrontEndService = require("../services/storefront/mediaHistoryFrontEndService");
const memberSubscriptionFrontEndService = require("../services/account/memberSubscriptionFrontEndService");

const CheckoutPage = () => {
  const { user, checkout, setBasket } = useContext(SessionContext) || {}; 
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [transactionID, setTransactionID] = useState(null);
  const subscriptionPayment = false; 
  const [confirmation, setConfirmation] = useState(false);
  const total = checkout.reduce((acc, item) => acc + (item.tokens || 0), 0);

  const [memberSubscriptionData, setMemberSubscriptionData] = useState([]);
  const [enoughTokens, setEnoughTokens] = useState(false);
  console.log(memberSubscriptionData);

  const loadSubscriptionData = async (memberID) => {
    try {
      const response = await memberSubscriptionFrontEndService.get(
        '/readRecords',
        { MemberID: memberID },
        true
      );
      setMemberSubscriptionData(response.data[0] || {});
      
      if (response.data[0].RemainingTokens >= total) {
        setEnoughTokens(true);
      }

    } catch (error) {
      console.error("Error fetching subscription data:", error);
    }
  };

  useEffect(() => {
    if (user) {
      loadSubscriptionData(user.MemberID);
    }
  }, [user]);

  const handleSelectedPaymentMethod = (method) => {
    setSelectedPaymentMethod(method);
  };

  const generateTransactionID = () => {
    return user.MemberID + '-' + Date.now()
  }

  const handlePayment = () => {

    if (!user) {
      alert("Please log in to proceed with payment.");
      return;
    }
    if (subscriptionPayment && !selectedPaymentMethod) {
      alert("Please select a payment method.");
      return;
    }
    if (!enoughTokens) {
      alert("Please subscribe to proceed with payment.");
      return;
    }
    const paymentMethod = subscriptionPayment ? selectedPaymentMethod : 'token';
    setTransactionID(generateTransactionID);

    const transaction = {
      transactionID,
      user,
      checkout,
      paymentMethod,
      total
    };

    console.log('Transaction: ', transaction);
    setBasket([]);
    setConfirmation(true);
  };

  return (
    <>
      {/* Confirmation */}
      {confirmation && (
        <div id="confirmation" className="whats-new py-4 d-flex align-items-center justify-content-center">
          <div className="content-panel" style={{ textAlign: 'center' }}>
            <h4>Order Confirmation</h4>
            <p>
              Thank you for your order, {user?.FirstName}.<br />
              Here is your order number:
            </p>
            <p><strong>#{transactionID}</strong></p>
            <Row>
              <Col>
                <Button className='button-primary-outline' as={Link} to='/'>
                  Back To Home
                </Button>
              </Col>
              <Col>
                <Button className='button-primary-outline' as={Link} to='/account#library'>
                  View My Library
                </Button>
              </Col>
            </Row>
          </div>
        </div>
      )}

      <Container fluid='lg'>
        <h1 className="pb-2 pt-4">Checkout</h1>
        <Row>
          <Col>

            {/* Account and Login */}    
            <h4 id="details">Your Details</h4>
            {!user ? (
              <LoginCard onLoginSuccess={(success) => success} />
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
                <Button className='button-primary-outline' as={Link} to="/basket" disabled={confirmation}>
                  Edit Basket
                </Button>
              </div>
            </div>
          </Col>

          <Col>
            {/* Payment */}  
            {user && (
              <>
                <h4 id="payment">Payment</h4>
                <div className='content-panel'>
                  {!memberSubscriptionData.RemainingTokens ? (
                    <>
                      <span>
                        Not subscribed, please click{" "}<Link to="/help#return-policy">here</Link>{" "}To purchase tokens.
                      </span>
                    </>
                  ) : (
                    <>
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
                          <span className='highlight-primary-outline'>{memberSubscriptionData.RemainingTokens}</span>
                        </Col>
                        <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ color: 'var(--primary)' }}>{memberSubscriptionData.SubscriptionDate}</span>
                        </Col>
                        {!enoughTokens && (
                          <span className='pt-3'>
                            Not enough tokens, please click{" "}<Link to="/help#return-policy">here</Link>{" "}to subscribe.
                          </span>
                        )}
                      </Row>
                    </>
                  )}
                </div>
    
                {/* Subscription Payment */}  
                {subscriptionPayment && (
                  <Row className='g-0 mt-4'>
                    <PaymentCard onSelectPaymentMethod={handleSelectedPaymentMethod} />
                  </Row>
                )}
    
                {/* Payment Bar */} 
                {!confirmation && (
                  <Row className='g-0 pt-4'>
                    <Button onClick={handlePayment} className='button-primary mb-4' style={{ width: '100%', boxShadow: 'var(--drop-shadow)' }} as={Link} to="/checkout#confirmation" disabled={!enoughTokens}>
                      Pay Total: {total}
                    </Button>
                    <span>
                      For more information on payments and media rental policies, click{" "}
                      <Link to="/help#return-policy">here</Link>
                    </span>
                  </Row>
                )}
              </>
            )}      
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CheckoutPage;