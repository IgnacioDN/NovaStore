import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaSearch, FaUser, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import "../styles/Header.css";
import "../styles/SearchModal.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const searchModalInputRef = useRef(null);
  const navigate = useNavigate();

  const { cart } = useCart();
  const cartCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  useEffect(() => {
    if (searchModalOpen && searchModalInputRef.current) {
      searchModalInputRef.current.focus();
    }
  }, [searchModalOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchText.trim())}`);
      setSearchModalOpen(false);
      setSearchText("");
    }
  };

  const openSearchModal = () => {
    setSearchModalOpen(true);
    setMenuOpen(false);
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
              <NavLink to="/" onClick={() => setMenuOpen(false)}>
                <h1>NovaStore</h1>
              </NavLink>
            </div>

            {menuOpen ? (
              <FaTimes className="menu-icon" onClick={() => setMenuOpen(false)} />
            ) : (
              <FaBars className="menu-icon" onClick={() => setMenuOpen(true)} />
            )}

            <ul className={`nav-menu ${menuOpen ? "open" : ""}`}>
              <li>
                <NavLink to="/men" onClick={() => setMenuOpen(false)} className={({ isActive }) => (isActive ? "active" : "")}>
                  Men
                </NavLink>
              </li>
              <li>
                <NavLink to="/women" onClick={() => setMenuOpen(false)} className={({ isActive }) => (isActive ? "active" : "")}>
                  Women
                </NavLink>
              </li>
              <li>
                <NavLink to="/accessories" onClick={() => setMenuOpen(false)} className={({ isActive }) => (isActive ? "active" : "")}>
                  Accessories
                </NavLink>
              </li>
              <li>
                <NavLink to="/blog" onClick={() => setMenuOpen(false)} className={({ isActive }) => (isActive ? "active" : "")}>
                  Blog
                </NavLink>
              </li>
              <li>
                <NavLink to="/shop" onClick={() => setMenuOpen(false)} className={({ isActive }) => (isActive ? "active" : "")}>
                  Shop
                </NavLink>
              </li>
            </ul>

            <div className="nav-icons">
              <FaSearch className="icon search-icon" onClick={openSearchModal} />

              <NavLink to="/login">
                <FaUser className="icon" />
              </NavLink>

              <NavLink to="/cart" className="cart-icon-link">
                <FaShoppingCart className="icon" />
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </NavLink>
            </div>
          </div>
        </nav>
      </header>

      {/* Search Modal */}
      {searchModalOpen && (
        <div className="search-modal-overlay" onClick={() => setSearchModalOpen(false)}>
          <div className="search-modal" onClick={(e) => e.stopPropagation()}>
            <div className="search-modal-header">
              <h3>Search Products</h3>
              <button 
                className="search-modal-close" 
                onClick={() => setSearchModalOpen(false)}
              >
                <FaTimes />
              </button>
            </div>
            <form className="search-modal-form" onSubmit={handleSearch}>
              <div className="search-input-group">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  value={searchText}
                  ref={searchModalInputRef}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="search-modal-input"
                />
              </div>
              
              <div className="popular-searches">
                <h4>Popular Searches</h4>
                <div className="popular-searches-grid">
                  <button 
                    type="button"
                    className="popular-search-item" 
                    onClick={() => { 
                      setSearchText('jacket'); 
                      searchModalInputRef.current?.focus();
                    }}
                  >
                    Jackets
                  </button>
                  <button 
                    type="button"
                    className="popular-search-item" 
                    onClick={() => { 
                      setSearchText('dress'); 
                      searchModalInputRef.current?.focus();
                    }}
                  >
                    Dresses
                  </button>
                  <button 
                    type="button"
                    className="popular-search-item" 
                    onClick={() => { 
                      setSearchText('shoes'); 
                      searchModalInputRef.current?.focus();
                    }}
                  >
                    Shoes
                  </button>
                  <button 
                    type="button"
                    className="popular-search-item" 
                    onClick={() => { 
                      setSearchText('accessories'); 
                      searchModalInputRef.current?.focus();
                    }}
                  >
                    Accessories
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
