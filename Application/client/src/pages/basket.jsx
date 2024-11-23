import React, { useContext } from 'react';
import { Container, Row, Col, Table, Tab, Button } from 'react-bootstrap';
import { SessionContext } from '../services/sessionContext';
import mediaFrontEndService from '../services/storefront/mediaFrontEndService';
import Form from 'react-bootstrap/esm/Form';

const BasketPage = () => {
  const { basket } = useContext(SessionContext) || {}; 
  const mediaArtwork = mediaFrontEndService.generateImageSrc('The Boy in the Striped Pyjamas', 'Book');
  // const mediaArtwork = mediaFrontEndService.generateImageSrc(media.Title, media.Type);
  const branch = [];

  const rentLength = 7;
  const today = new Date();
  const startDate = today.toLocaleDateString('en-GB').split('/').join('-'); 
  const returnDateObj = new Date(today);
  returnDateObj.setDate(returnDateObj.getDate() + rentLength);
  const returnDate = returnDateObj.toLocaleDateString('en-GB').split('/').join('-');

  return (
    <Container fluid='lg'>
      <h2>Your Basket</h2>
      <div className="content-panel">
        <Table hover className='aml-table'>
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
            <tr style={{ verticalAlign: 'middle' }}>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
                  {/* Column 1: Remove */}
                  <div>
                    <span>Remove</span>
                  </div>

                  {/* Column 2: Image */}
                  <div style={{ flex: '0 0 auto' }}>
                    <img
                      src={mediaArtwork}
                      alt="image"
                      style={{
                        height: '100%',
                        aspectRatio: '1',
                        objectFit: 'contain',
                      }}
                    />
                  </div>

                  {/* Column 3: Title and Info */}
                  <div>
                    <span><strong>{'Media Title'}</strong></span><br />
                    <span>Rent tokens per week: 1</span>
                  </div>
                </div>
              </td>

              <td>
                <span className="highlight-secondary-outline">{startDate}</span>
              </td>

              <td>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Button className="button-primary mb-3" style={{ width: '3rem' }}>+ 7</Button>
                  {returnDate}
                  <Button className="button-primary-outline mt-3" style={{ width: '3rem' }}>- 7</Button>
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
                  onChange={(e) => setDeliveryOption(e.target.value)}
                  required
                >
                  <option value="collect">Collect In-Store</option>
                  <option value="delivery">Home Delivery</option>
                </Form.Select>
              </td>

              <td>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
                  1
                </div>
              </td>
            </tr>
          </tbody>
        </Table>
        <div style={{ textAlign: 'right' }}>
          <h4>Total: {} Tokens</h4>
          <Button className="button-primary">Checkout</Button>
        </div>
      </div>


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
      
    </Container>
  );
};

export default BasketPage;
