import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaSearch, FaUser, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import "../styles/Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  // 🍔 Contexto del carrito
  const { cart } = useCart();
  const cartCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  // Autofocus cuando aparece el input
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchText.trim())}`);
      setSearchOpen(false);
      setSearchText("");
    }
  };

  // Cierra el input si se pierde el foco y no hay texto
  const handleBlur = () => {
    if (!searchText) setSearchOpen(false);
  };

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
              {/* Buscador: icono y campo */}
              {!searchOpen ? (
                <FaSearch className="icon" onClick={() => setSearchOpen(true)} />
              ) : (
                <form className="search-form" onSubmit={handleSearch}>
                  <input
                    type="text"
                    placeholder="Buscar..."
                    value={searchText}
                    ref={searchInputRef}
                    onChange={e => setSearchText(e.target.value)}
                    onBlur={handleBlur}
                    className="search-input"
                  />
                  <button type="submit" className="search-btn">
                    <FaSearch />
                  </button>
                </form>
              )}

              <Link to="/login">
                <FaUser className="icon" />
              </Link>

              <Link to="/cart" className="cart-icon-link">
                <FaShoppingCart className="icon" />
                {cartCount > 0 && (
                  <span className="cart-badge">{cartCount}</span>
                )}
              </Link>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;