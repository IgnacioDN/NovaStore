import React, { useState } from "react";
import { Link } from "react-router-dom"; // 👈 Importá Link
import { FaBars, FaTimes, FaSearch, FaUser, FaShoppingCart } from "react-icons/fa";
import "../styles/header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="top-banner">
        Free shipping on purchases over $500! 🎉
      </div>
      <header className="header">
        <nav className="main-header">
          <div className="header-container">
            <div className="header__logo">
              <h1>NovaStore</h1>
            </div>

            {menuOpen ? (
              <FaTimes className="menu-icon" onClick={() => setMenuOpen(false)} />
            ) : (
              <FaBars className="menu-icon" onClick={() => setMenuOpen(true)} />
            )}

            <ul className={`nav-menu ${menuOpen ? "open" : ""}`}>
              <li><a href="#">Men</a></li>
              <li><a href="#">Women</a></li>
              <li><a href="#">Accesories</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Shop</a></li>
            </ul>

            <div className="nav-icons">
              <FaSearch className="icon" />
              <FaUser className="icon" />

              <Link to="/checkout">
                <FaShoppingCart className="icon" />
              </Link>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
