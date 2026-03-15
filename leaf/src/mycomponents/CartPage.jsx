import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CheckoutPage.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function CheckoutPage({ user, cartItems }) {
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      alert("Your cart is empty!");
      navigate("/plants");
    }
  }, [cartItems, navigate]);

  const handlePayment = async () => {
    if (!name.trim() || !phone.trim() || !address.trim()) {
      alert("⚠️ Please fill all details.");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      alert("⚠️ Please enter a valid 10-digit phone number.");
      return;
    }

    try {
      for (let item of cartItems) {
        // Use real _id or temporary ID
        const productId = item._id || item.id || item.productId || null;

        if (!productId) {
          alert(`❌ Invalid product ID for ${item.name}`);
          return;
        }

        const payload = {
          productId,
          userId: user?._id || null, // guest checkout allowed
          name,
          phone,
          address,
          type: item.type || "plant",
          paymentMethod: "Cash on Delivery",
        };

        console.log("📦 Order payload:", payload);

        const res = await fetch(`${API_URL}/api/orders`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (!res.ok) {
          console.error("❌ Order API error:", data);
          alert(data.message || `Failed to place order for ${item.name}`);
          return;
        }
      }

      localStorage.removeItem("cartItems");
      alert("🎉 Order placed successfully!");
      navigate("/");
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Something went wrong while placing the order!");
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      <div className="checkout-cart">
        <h3>Products:</h3>
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
        </ul>
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
          placeholder="Phone Number (10 digits)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          maxLength="10"
        />
        <textarea
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <button onClick={handlePayment} className="checkout-btn">
        Place Order (Cash on Delivery)
      </button>
    </div>
  );
}
