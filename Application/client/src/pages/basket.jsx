import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { SessionContext } from '../services/sessionContext';

const BasketPage = () => {
  const { basket } = useContext(SessionContext) || {}; 

  return (
    <Container>
      <h2>Your Basket</h2>
      <Row>
        {basket?.length > 0 ? ( 
          basket.map((item, index) => (
            <Col key={index}>
              <div>
                <h5>{item?.Title || 'No Title Available'}</h5> 
                <p>{item?.Type || 'No Type Available'}</p>    
                <p>Branch ID: {item?.branchId || 'N/A'}</p> 
              </div>
            </Col>
          ))
        ) : (
          <p>Your basket is empty.</p> 
        )}
      </Row>
    </Container>
  );
};

export default BasketPage;
