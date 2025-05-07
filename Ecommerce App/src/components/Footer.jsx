import React from 'react';
import { Link } from "react-router-dom"; 
import { FaBars, FaTimes, FaSearch, FaUser, FaShoppingCart } from "react-icons/fa";
import { FaFacebookF, FaInstagram, FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <h2>NovaStore</h2>
        </div>
        <div className="footer-links">
          <div className="footer-column">
            <h3>Product</h3>
            <ul>
              <li><a href="#">Simple</a></li>
              <li><a href="#">Variable</a></li>
              <li><a href="#">Grouped</a></li>
              <li><a href="#">Affiliate</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Information</h3>
            <ul>
              <li><a href="#">Privacy</a></li>
              <li><a href="#">Cookies</a></li>
              <li><a href="#">Terms</a></li>
              <li><a href="#">Security</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Support</h3>
            <ul>
              <li><a href="#">Chat</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Location</a></li>
              <li><a href="#">Social Media</a></li>
            </ul>
          </div>
        </div>
      </div>

      <hr />

      <div className="footer-bottom">
        <p>© 2025 | <strong>NovaStore</strong> | Theme by <a href="#">Ignacio Diaz Neila</a></p>
        <div className="social-icons">
  <a href="#"><FaFacebookF /></a>
  <a href="#"><FaInstagram /></a>
  <a href="#"><FaXTwitter /></a>
</div>

      </div>
    </footer>
  );
};

export default Footer;
