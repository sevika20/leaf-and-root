import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* About Section */}
        <div className="footer-about">
          <h3>Leaf & Root</h3>
          <p>
            Bringing the beauty of nature into your home, office, and garden.  
            Plants, seeds, and care tips for every green enthusiast.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Plants</Link></li>
            <li><Link to="/seeds">Seeds</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/cart">Cart</Link></li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p>Email: support@leafandroot.com</p>
          <p>Phone: +91 98765 43210</p>
          <div className="footer-socials">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Leaf & Root. All Rights Reserved.
      </div>
    </footer>
  );
}
export default Footer;