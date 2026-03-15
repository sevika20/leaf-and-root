// src/mycomponents/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password!");
      return;
    }

    // Example: save user info (optional)
    console.log({ email, role });

    // Navigate based on role
    if (role === 'seller') {
      navigate('/seller');
    } else {
      navigate('/customer');
    }
  };

  return (
    <div className="login-container">
      <h2>{role === 'seller' ? 'Seller Login' : 'Customer Login'}</h2>
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
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="customer">Customer</option>
          <option value="seller">Seller</option>
        </select>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
