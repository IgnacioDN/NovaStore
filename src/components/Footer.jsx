import React, { useState, useEffect } from 'react';
import { FaFacebookF, FaInstagram, FaXTwitter } from 'react-icons/fa6';

// Utilidad para saber si es mobile
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return isMobile;
};

const Footer = () => {
  const isMobile = useIsMobile();
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  // --------- MOBILE FOOTER (Accordion) -----------
  if (isMobile) {
    return (
      <footer className="footer footer-mobile">
        <div className="footer-brand-mobile" style={{ marginBottom: 20 }}>
          <h2 style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 700,
            fontSize: "2rem",
            color: "#fff",
            letterSpacing: "1px",
            textShadow: "0 0 8px #fff, 0 0 24px #fff"
          }}>
            NovaStore
          </h2>
        </div>
        <div className="footer-accordion">
          <button className="footer-accordion-header" onClick={() => toggleSection('product')}>
            Product <span className="icon">{openSection === 'product' ? '-' : '+'}</span>
          </button>
          <ul className="footer-accordion-list" style={{ display: openSection === 'product' ? 'block' : 'none' }}>
            <li><a href="#">Simple</a></li>
            <li><a href="#">Variable</a></li>
            <li><a href="#">Grouped</a></li>
            <li><a href="#">Affiliate</a></li>
          </ul>
        </div>
        <div className="footer-accordion">
          <button className="footer-accordion-header" onClick={() => toggleSection('info')}>
            Information <span className="icon">{openSection === 'info' ? '-' : '+'}</span>
          </button>
          <ul className="footer-accordion-list" style={{ display: openSection === 'info' ? 'block' : 'none' }}>
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Cookies</a></li>
            <li><a href="#">Terms</a></li>
            <li><a href="#">Security</a></li>
          </ul>
        </div>
        <div className="footer-accordion">
          <button className="footer-accordion-header" onClick={() => toggleSection('support')}>
            Support <span className="icon">{openSection === 'support' ? '-' : '+'}</span>
          </button>
          <ul className="footer-accordion-list" style={{ display: openSection === 'support' ? 'block' : 'none' }}>
            <li><a href="#">Chat</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Location</a></li>
            <li><a href="#">Social Media</a></li>
          </ul>
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
  }

  // --------- DESKTOP FOOTER (expandido) -----------
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