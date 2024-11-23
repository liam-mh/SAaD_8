import React, { useContext } from 'react';
import { Container, Table, Button, Form } from 'react-bootstrap';
import { SessionContext } from '../services/sessionContext';
import mediaFrontEndService from '../services/storefront/mediaFrontEndService';

const BasketPage = () => {
  const { basket, setBasket, branches } = useContext(SessionContext) || {};
  if (!basket || !branches) {
    return <p>No basket information...</p>;
  }

  const rentLength = 7;
  const today = new Date();
  const startDate = today.toLocaleDateString('en-GB').split('/').join('-');

  const calculateReturnDate = (days) => {
    const returnDateObj = new Date(today);
    returnDateObj.setDate(returnDateObj.getDate() + days);
    return returnDateObj.toLocaleDateString('en-GB').split('/').join('-');
  };

  const getBranchInfo = (BranchID) => {
    if (!branches || branches.length === 0) {
      return null;
    }
    return branches.find((branch) => branch.BranchID === BranchID) || null;
  };

  const handleRemove = (itemToRemove) => {
    const updatedBasket = basket.filter(
      (item) =>
        item.Title !== itemToRemove.Title ||
        item.Type !== itemToRemove.Type ||
        item.BranchID !== itemToRemove.BranchID
    );
    setBasket(updatedBasket);
  };

  return (
    <Container fluid="lg">
      <h2>Your Basket</h2>
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
            {basket.map((item, index) => {
              const branch = getBranchInfo(item.BranchID);
              const mediaArtwork = mediaFrontEndService.generateImageSrc(
                item.Title,
                item.Type
              );

              return (
                <tr key={index} style={{ verticalAlign: 'middle' }}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
                      {/* Column 1: Remove */}
                      <div>
                        <Button 
                          variant='danger'
                          onClick={() => handleRemove(item)}
                        >
                          X
                        </Button>
                      </div>

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
                    <span className="highlight-secondary-outline">{startDate}</span>
                  </td>

                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <Button className="button-primary mb-3" style={{ width: '3rem' }}>
                        + 7
                      </Button>
                      {calculateReturnDate(rentLength)}
                      <Button className="button-primary-outline mt-3" style={{ width: '3rem' }}>
                        - 7
                      </Button>
                    </div>
                  </td>

                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <span>{branch?.FirstLineAddress || 'First Line'}</span>
                      <span>{branch?.City || 'City'}</span>
                      <span>{branch?.Postcode || 'Postcode'}</span>
                    </div>
                  </td>

                  <td>
                    <Form.Select
                      className="form-secondary"
                      onChange={(e) => console.log('Selected delivery:', e.target.value)}
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
              );
            })}
          </tbody>
        </Table>
        <div style={{ textAlign: 'right' }}>
          <h4>Total: {basket.length} Tokens</h4>
          <Button className="button-primary">Checkout</Button>
        </div>
      </div>
    </Container>
  );
};

export default BasketPage;