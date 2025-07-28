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
    <div className="cart-modal-overlay">
      <div className="cart-modal-box">
        <button className="cart-modal-close" onClick={closeModal}>
          &times;
        </button>
        <h2>{lastAdded.title}</h2>
        <img
          src={lastAdded.image}
          alt={lastAdded.title}
          className="cart-modal-img"
        />
        <p>
          <b>Price:</b> ${lastAdded.price}
        </p>
        <p>
          <b>Rating:</b>{" "}
          {lastAdded.rating?.rate || "-"} <span style={{ color: "#ffc107" }}>★</span>
        </p>
        <button
          className="cart-modal-checkout-btn"
          onClick={() => {
            closeModal();
            navigate("/checkout");
          }}
        >
          Ir al checkout
        </button>
      </div>
    </div>
  );
};

export default CartModal;