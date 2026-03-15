// src/mycomponents/SellerLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function SellerLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sellerId, setSellerId] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password || !sellerId) {
      alert("Please fill all fields!");
      return;
    }

    alert(`Seller Login Successful!\nEmail: ${email}\nSeller ID: ${sellerId}`);
    navigate("/Seller");
  };

  return (
    <div className="login-container">
      <h2>Seller Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Enter Seller ID"
          value={sellerId}
          onChange={(e) => setSellerId(e.target.value)}
          required
        />
        <button className="submit-button" type="submit">Login</button>


      </form>
    </div>
  );
}
export default SellerLogin;
