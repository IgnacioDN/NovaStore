import React, { useEffect } from "react";
import { useCart } from "./CartContext";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/CartModal.css";

const CartModal = () => {
  const { lastAdded, isCartModalOpen, closeModal } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  // Cierra el modal automáticamente si entras a checkout
  useEffect(() => {
    if (location.pathname === "/checkout" && isCartModalOpen) {
      closeModal();
    }
  }, [location.pathname, isCartModalOpen, closeModal]);

  if (!isCartModalOpen || location.pathname === "/checkout" || !lastAdded) return null;

  return (
    <div className="cart-modal-overlay" onClick={closeModal}>
      <div
        className="cart-modal-box cart-modal-animated"
        onClick={e => e.stopPropagation()}
      >
        <button className="cart-modal-close" onClick={closeModal}>
          &times;
        </button>
        <div className="cart-modal-check-icon">
          <i className="fa-solid fa-circle-check"></i>
        </div>
        <h3 className="cart-modal-title">
          You added <span style={{ fontWeight: 700 }}>{lastAdded.title}</span> to your cart!
        </h3>
        <img
          src={lastAdded.image}
          alt={lastAdded.title}
          className="cart-modal-img"
        />
        <div className="cart-modal-product-details">
          <span><b>Price:</b> ${lastAdded.price}</span>
          <span>
            <b>Rating:</b> {lastAdded.rating?.rate || "-"} <span style={{ color: "#ffc107" }}>★</span>
          </span>
        </div>
        <button
          className="cart-modal-checkout-btn"
          onClick={() => {
            closeModal();
            navigate("/cart");
          }}
        >
          View Cart
        </button>
        <p className="cart-modal-extra-text">
          You can continue shopping or view your cart.
        </p>
      </div>
    </div>
  );
};

export default CartModal;