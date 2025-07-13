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
              <Link to="/" onClick={() => setMenuOpen(false)}>
                <h1>NovaStore</h1>
              </Link>
            </div>

            {menuOpen ? (
              <FaTimes className="menu-icon" onClick={() => setMenuOpen(false)} />
            ) : (
              <FaBars className="menu-icon" onClick={() => setMenuOpen(true)} />
            )}

            <ul className={`nav-menu ${menuOpen ? "open" : ""}`}>
              <li><Link to="/men" onClick={() => setMenuOpen(false)}>Men</Link></li>
              <li><Link to="/women" onClick={() => setMenuOpen(false)}>Women</Link></li>
              <li><Link to="/accessories" onClick={() => setMenuOpen(false)}>Accesories</Link></li>
              <li><Link to="#" onClick={() => setMenuOpen(false)}>Blog</Link></li>
              <li><Link to="#" onClick={() => setMenuOpen(false)}>Shop</Link></li>
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
