import React, { useState } from "react";
import './CustomerSignup.css';

import { useNavigate, useLocation } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL; // e.g., http://localhost:5000/api

export default function CustomerSignup({ setUser }) {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/"; // where to go after signup

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill all fields!");
      return;
    }

    setLoading(true);

    try {
     const res = await fetch(`${API_URL}/api/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Backend sends "User already exists" or other errors
        alert(data.message || "Signup failed!");
        setLoading(false);
        return;
      }

      // Save user info and token
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      setUser(data.user);

      alert("Signup successful!");

      // Redirect to original page or home
      navigate(from);
    } catch (err) {
      console.error("Signup error:", err);
      alert("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>Customer Signup</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Signing up..." : "Signup"}
        </button>
      </form>
    </div>
  );
}


//