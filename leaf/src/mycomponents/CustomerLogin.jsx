import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function CustomerLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if already logged in and no redirect state
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user && !location.state?.from) {
      navigate("/"); // go to homepage
    }
  }, [navigate, location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields!");
      return;
    }

    setLoading(true);

    try {
      console.log("Sending login request to:", `${API_URL}/users/login`);
      console.log("Payload:", { email, password });

      const res = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      console.log("Response status:", res.status);

      const data = await res.json().catch(() => null);
      console.log("Response data:", data);

      if (res.ok && data?.token && data?.user) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("Login successful!");

        const redirectTo = location.state?.from || "/";
        navigate(redirectTo);
      } else {
        const message =
          data?.message || `Login failed. Status code: ${res.status}`;
        alert(message);
      }
    } catch (err) {
      console.error("Login error:", err);
      alert(
        "Something went wrong! Please check your backend and internet connection."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Customer Login</h2>
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
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default CustomerLogin;

