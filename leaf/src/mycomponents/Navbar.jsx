import React from 'react';
import logo from "../assets/logo.png";
import "./Navbar.css";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { useNavigate, Link, useLocation } from 'react-router-dom';

export default function Navbar({ searchTerm, setSearchTerm, cartCount, user }) {
  const navigate = useNavigate();
  const location = useLocation(); // get current path

  // Navigate based on selected option
  const handleRoleSelect = (e) => {
    const role = e.target.value;
    if (role === 'seller') {
      navigate('/Seller-login');
    } else if (role === 'signup') {
      navigate('/signup');
    }
  };

  return (
    <div className='navbar'>

      {/* Logo */}
      <div className='logo'>
        <Link to="/">
          <img src={logo} alt="Leaf and Root Logo" className="logo-img" />
        </Link>
      </div>

      {/* Menu Links */}
      <ul className='list'>
        <li><Link to="/">Plants</Link></li>
        <li><Link to="/seeds">Seeds</Link></li>
        <li><Link to="/about">About Us</Link></li>
      </ul>

      {/* Search Box */}
      <div className='search-box'>
        <FaSearch className="button" />
        <input
          type="text"
          placeholder='Search items...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Login & Cart */}
      <div className='login-cart'>
        {user ? (
          <>
            <span style={{ marginRight: "10px" }}>Welcome, {user.name}</span>
            <button onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              window.location.reload(); // refresh to update navbar
            }}>Logout</button>
          </>
        ) : (
          <select
            defaultValue=""
            onChange={handleRoleSelect}
            className='login-type'
          >
            <option value="" disabled>Login / Signup</option>
            <option value="seller">Seller Login</option>
            <option value="signup">Signup</option>
          </select>
        )}

        {/* Cart Icon */}
        <Link to="/cart" className={`icon-cart-button ${cartCount > 0 ? "active" : ""}`}>
          <FaShoppingCart className='icon-cart' />
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>
      </div>

    </div>
  );
}
