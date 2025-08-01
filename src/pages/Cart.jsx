import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "../styles/Cart.css";

const Cart = () => {
  const { cart, updateQty, setCart } = useCart();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();

  // Handler para quitar producto
  const handleRemove = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Handler para aplicar cupón
  const applyCoupon = () => {
    if (coupon === "CUPON10") {
      setDiscount(0.1);
    } else {
      setDiscount(0);
    }
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const subtotal = cart.reduce(
    (acc, prod) => acc + prod.price * prod.quantity,
    0
  );
  const total = subtotal * (1 - discount);

  return (
    <div className="cart-main">
      <div className="cart-list">
        <h2>
          Cart <span>({cart.length})</span>
        </h2>
        {cart.map((item) => (
          <div className="cart-item" key={item.id}>
            <div className="cart-img">
              <img src={item.image} alt={item.title} />
            </div>
            <div className="cart-info">
              <div className="cart-title">{item.title}</div>
              {item.desc && (
                <div className="cart-desc">{item.desc}</div>
              )}
              <div className="cart-price-row">
                {item.originalPrice && item.originalPrice > item.price ? (
                  <>
                    <span className="cart-price-strike">
                      ${Number(item.originalPrice * item.quantity).toFixed(2)}
                    </span>
                    <span className="cart-price-final">
                      ${Number(item.price * item.quantity).toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className="cart-price-final">
                    ${Number(item.price * item.quantity).toFixed(2)}
                  </span>
                )}
              </div>
              <div className="cart-qty-row">
                <button onClick={() => updateQty(item.id, -1)}>-</button>
                <span className="qty-value">{item.quantity}</span>
                <button onClick={() => updateQty(item.id, 1)}>+</button>
                <span className="cart-remove" onClick={() => handleRemove(item.id)} title="Quitar producto">
                  🗑️
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="cart-summary-box">
          <div className="cart-summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="cart-summary-row discount">
              <span>Discount</span>
              <span>-{(discount * 100).toFixed(0)}%</span>
            </div>
          )}
          <div className="cart-summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="cart-summary-total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        <div className="cart-coupon-box">
          <input
            type="text"
            placeholder="Coupon Code"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
          />
          <button onClick={applyCoupon}>Apply</button>
        </div>
        <button className="cart-pay-btn" onClick={handleCheckout}>
          Proceed to checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;