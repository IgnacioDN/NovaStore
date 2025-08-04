import React from "react";
import { FaCheck, FaTimes, FaShoppingBag, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/PlaceOrderModal.css";

const PlaceOrderModal = ({ isOpen, onClose, orderDetails }) => {
  const navigate = useNavigate();
  const { clearCart } = useCart();

  if (!isOpen) return null;

  const handleContinueShopping = () => {
    clearCart();
    onClose();
    navigate("/shop");
  };

  const handleGoHome = () => {
    clearCart();
    onClose();
    navigate("/");
  };

  return (
    <div className="place-order-modal-overlay" onClick={onClose}>
      <div className="place-order-modal" onClick={(e) => e.stopPropagation()}>
        <button className="place-order-modal-close" onClick={onClose}>
          <FaTimes />
        </button>
        
        <div className="place-order-success-icon">
          <FaCheck />
        </div>
        
        <div className="place-order-content">
          <h2>Order Placed Successfully!</h2>
          <p className="place-order-message">
            Thank you for your purchase! Your order has been confirmed and is being processed.
          </p>
          
          <div className="order-details-card">
            <h3>Order Summary</h3>
            <div className="order-detail-row">
              <span>Order Number:</span>
              <span className="order-number">#{orderDetails?.orderNumber || 'NO-' + Date.now()}</span>
            </div>
            <div className="order-detail-row">
              <span>Total Amount:</span>
              <span className="order-total">${orderDetails?.total || '0.00'}</span>
            </div>
            <div className="order-detail-row">
              <span>Items:</span>
              <span>{orderDetails?.itemCount || 0} item{orderDetails?.itemCount !== 1 ? 's' : ''}</span>
            </div>
            <div className="order-detail-row">
              <span>Estimated Delivery:</span>
              <span>3-5 business days</span>
            </div>
          </div>
          
          <div className="place-order-info">
            <p>
              📧 A confirmation email has been sent to your email address.
            </p>
            <p>
              📦 You can track your order status in your account.
            </p>
          </div>
          
          <div className="place-order-actions">
            <button className="continue-shopping-btn" onClick={handleContinueShopping}>
              <FaShoppingBag />
              Continue Shopping
            </button>
            <button className="go-home-btn" onClick={handleGoHome}>
              <FaHome />
              Go to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderModal;
