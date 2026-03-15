// src/mycomponents/CheckoutPage.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./CheckoutPage.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get product from CartPage
  const product = location.state?.product;

  // Redirect if no product selected
  if (!product) {
    alert("No product selected for checkout!");
    navigate("/plants");
    return null;
  }

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!name || !phone || !address) {
      alert("Please fill all details");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      alert("Phone number must be 10 digits");
      return;
    }

    const payload = {
      products: [
        { product: product._id, quantity: 1 }
      ],
      totalAmount: product.price,
      paymentMethod: "Cash on Delivery",
      customerDetails: { name, phone, address },
      type: "plant"
    };

    console.log("Sending order payload:", payload);

    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        alert(data.message || "Failed to place order");
        console.error("Order API error:", data);
        return;
      }

      alert("Order placed successfully with Cash on Delivery!");
      navigate("/"); // redirect to home after order
    } catch (err) {
      setLoading(false);
      console.error("Checkout error:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      <div className="checkout-cart">
        <h3>Product:</h3>
        <p>{product.name} - ₹{product.price}</p>
      </div>

      <div className="checkout-form">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          maxLength={10}
        />
        <textarea
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <button
        onClick={handlePayment}
        className="checkout-btn"
        disabled={loading}
      >
        {loading ? "Placing Order..." : "Place Order (Cash on Delivery)"}
      </button>
    </div>
  );
}


