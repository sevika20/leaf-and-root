import React, { useState } from "react";
import "./PaymentPage.css";

export default function PaymentPage() {
  const [method, setMethod] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!method) {
      alert("Please select a payment method");
      return;
    }
    alert(`Payment successful with ${method}`);
  };

  return (
    <div className="payment-page">
      <h2>Payment Gateway</h2>
      <p className="subtitle">Select your preferred payment method:</p>

      <form onSubmit={handleSubmit} className="payment-form">
        <label className="payment-option">
          <input
            type="radio"
            name="payment"
            value="Credit/Debit Card"
            onChange={(e) => setMethod(e.target.value)}
          />
          Credit / Debit Card
        </label>

        <label className="payment-option">
          <input
            type="radio"
            name="payment"
            value="UPI"
            onChange={(e) => setMethod(e.target.value)}
          />
          UPI
        </label>

        <label className="payment-option">
          <input
            type="radio"
            name="payment"
            value="Net Banking"
            onChange={(e) => setMethod(e.target.value)}
          />
          Net Banking
        </label>

        <label className="payment-option">
          <input
            type="radio"
            name="payment"
            value="Cash on Delivery"
            onChange={(e) => setMethod(e.target.value)}
          />
          Cash on Delivery
        </label>

        <button type="submit" className="pay-button">Pay Now</button>
      </form>
    </div>
  );
}

