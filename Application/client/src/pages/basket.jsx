import React, { useContext, useState } from 'react';
import { Container, Table, Button, Form } from 'react-bootstrap';
import { SessionContext } from '../services/sessionContext';
import MediaFrontEndService from '../services/storefront/mediaFrontEndService';
import { Link } from 'react-router-dom';
import moment from 'moment';

const BasketPage = () => {
  const mediaFrontEndService = new MediaFrontEndService();
  const { basket, setBasket, branches, setCheckout } = useContext(SessionContext) || {};
  const [deliveryOptions, setDeliveryOptions] = useState(basket.map(() => 'collect'));
  if (!basket || !branches) {
    return <p>No basket information...</p>;
  }

  const today = moment().format("YYYY-MM-DD");
  const adjustRentLength = (index, adjustment) => {
    setBasket((prevBasket) =>
      prevBasket.map((item, i) =>
        i === index
          ? {
              ...item,
              rentLength: Math.max(7, (item.rentLength || 7) + adjustment),
            }
          : item
      )
    );
  };
  const calculateReturnDate = (rentLength) => {
    return moment().add(rentLength, "days").format("YYYY-MM-DD");
  };

  const getBranchInfo = (BranchID) => {
    if (!branches || branches.length === 0) {
      return null;
    }
    return branches.find((branch) => branch.BranchID === BranchID) || null;
  };

  const handleCheckout = () => {
    const checkoutData = basket.map((item, index) => {
      const startDate = today;
      const rentLength = item.rentLength || 7;
      const returnDate = calculateReturnDate(rentLength);
      const tokens = Math.ceil(rentLength / 7);
      const deliveryOption = deliveryOptions[index]; 
      const branch = getBranchInfo(item.BranchID);

      return {
        ...item,
        startDate,
        returnDate,
        tokens,
        deliveryOption,
        branch
      };
    });

    setCheckout(checkoutData);
  };

  const handleDeliveryChange = (index, value) => {
    setDeliveryOptions((prevOptions) =>
      prevOptions.map((option, i) => (i === index ? value : option))
    );
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
      {basket.length === 0 ? (
        <div className="content-panel" style={{ width: 'fit-content' }}>
          <span>
            <strong>No items in your basket</strong>
            <br />
            <br />
            Click <Link to="/">here</Link> to continue shopping
          </span>
        </div>
      ) : (
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
                        <div>
                          <Button variant="danger" onClick={() => handleRemove(item)}>
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
                      <span>{today}</span>
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
                        <span>{branch?.FirstLineAddress || 'First Line'}</span>
                        <span>{branch?.City || 'City'}</span>
                        <span>{branch?.Postcode || 'Postcode'}</span>
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
              Total: {basket.reduce((acc, item) => acc + (Math.ceil(item.rentLength / 7) || 1), 0)} Tokens
            </h4>
            <Button className="button-primary" onClick={handleCheckout} as={Link} to="/checkout">
              Checkout
            </Button>
          </div>
        </div>
      )}
    </Container>
  );  
};

export default BasketPage;