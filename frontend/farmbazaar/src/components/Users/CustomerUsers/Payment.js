// Payment.js
import React, { useState } from 'react';

const Payment = ({ totalPrice, onPayAmount }) => {
  const [paymentMethod, setPaymentMethod] = useState('creditCard');

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h4>Payment Method</h4>
          <div className="mb-3">
            <div className="form-check">
              <input type="radio" id="creditCard" name="paymentMethod" value="creditCard" className="form-check-input" checked={paymentMethod === 'creditCard'} onChange={handlePaymentMethodChange} />
              <label htmlFor="creditCard" className="form-check-label">Credit Card</label>
            </div>
            <div className="form-check">
              <input type="radio" id="paypal" name="paymentMethod" value="paypal" className="form-check-input" checked={paymentMethod === 'paypal'} onChange={handlePaymentMethodChange} />
              <label htmlFor="paypal" className="form-check-label">PayPal</label>
            </div>
            <div className="form-check">
              <input type="radio" id="bankTransfer" name="paymentMethod" value="bankTransfer" className="form-check-input" checked={paymentMethod === 'bankTransfer'} onChange={handlePaymentMethodChange} />
              <label htmlFor="bankTransfer" className="form-check-label">Bank Transfer</label>
            </div>
          </div>
          <button type="button" className="btn btn-primary" onClick={onPayAmount}>Pay Amount: ${totalPrice}</button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
