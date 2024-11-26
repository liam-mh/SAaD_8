import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';

function PaymentCard({ onSelectPaymentMethod }) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const paymentMethods = [
    {
      method: 'card',
      text: 'Pay By card',
      image: ['masterCard', 'visa']
    },
    {
      method: 'digital-wallet',
      text: 'Pay By Digital Wallet',
      image: ['applePay', 'googlePay']
    },
    {
      method: 'pay-later',
      text: 'Pay in 30 Days',
      image: ['paypal']
    },
    {
      method: 'three-installments',
      text: 'Pay in 3 Interest-free Installments',
      image: ['klarna']
    }
  ];

  const handleCardClick = (methodName) => {
    setSelectedPaymentMethod(methodName);
    onSelectPaymentMethod(methodName);
  };

  return (
    <div className="payment-cards-container">
      {paymentMethods.map((method, index) => (
        <Card
          key={index}
          className={`payment-card ${selectedPaymentMethod === method.method ? 'selected' : ''}`}
          onClick={() => handleCardClick(method.method)} 
        >
          <Card.Body>
            {/* Text */}
            <div className="payment-card-text">
              <strong>{method.text}</strong>
            </div>

            {/* Images */}
            <div className="payment-card-images">
              {method.image.length === 1 ? (
                <img
                  src={`/${method.image[0]}.png`}
                  alt={method.image[0]}
                  className="payment-card-image"
                />
              ) : (
                method.image.map((img, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={`/${img}.png`} 
                    alt={img}
                    className="payment-card-image"
                  />
                ))
              )}
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default PaymentCard;