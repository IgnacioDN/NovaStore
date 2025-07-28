import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import "../styles/Checkout.css";

const Checkout = () => {
  const { cart, updateQty, setCart } = useCart();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

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


  const subtotal = cart.reduce(
    (acc, prod) => acc + prod.price * prod.quantity,
    0
  );
  const total = subtotal * (1 - discount);

  

  return (
    <div className="checkout-main">
      <div className="checkout-cart-list">
        <h2>
          Checkout <span>({cart.length})</span>
        </h2>
        {cart.map((item) => (
          <div className="checkout-cart-item" key={item.id}>
            <div className="checkout-cart-img">
              <img src={item.image} alt={item.title} />
            </div>
            <div className="checkout-cart-info">
              <div className="checkout-cart-title">{item.title}</div>
              <div className="checkout-cart-desc">{item.description?.slice(0, 80)}...</div>
              <div className="checkout-cart-qty-row">
                <button onClick={() => updateQty(item.id, -1)}>-</button>
                <span className="qty-value">{item.quantity}</span>
                <button onClick={() => updateQty(item.id, 1)}>+</button>
                <span className="checkout-cart-remove" onClick={() => handleRemove(item.id)} title="Quitar producto">
                  🗑️
                </span>
              </div>
            </div>
            <div className="checkout-cart-subtotal">
              <div className="checkout-cart-price">${item.price.toFixed(2)}</div>
              <div className="checkout-cart-sub">${(item.price * item.quantity).toFixed(2)}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="checkout-summary">
        <div className="checkout-summary-box">
          <div className="checkout-summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="checkout-summary-row discount">
              <span>Discount</span>
              <span>-{(discount * 100).toFixed(0)}%</span>
            </div>
          )}
          <div className="checkout-summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="checkout-summary-total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        <div className="checkout-coupon-box">
          <input
            type="text"
            placeholder="Coupon Code"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
          />
          <button onClick={applyCoupon}>Apply</button>
        </div>
        <button className="checkout-pay-btn">Proceed to checkout</button>
      </div>
    </div>
  );
};

export default Checkout;