import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import "../styles/Checkout.css";

export default function Checkout() {
  const { cart } = useCart();
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");

  const userName = "Ignacio Diaz Neila";
  const userAddress = "Roseti 709, CHACARITA, Buenos Aires, 1212, Argentina";
  const userPhone = "+541150473113";
  const subtotal = cart.reduce((acc, prod) => acc + prod.price * prod.quantity, 0);

  const handleOrder = () => {
    // Simula validación básica
    if (paymentMethod === "credit" && (!cardNumber || !cardName)) {
      setError("Por favor completa los datos de la tarjeta.");
      return;
    }
    if (!paymentMethod) {
      setError("Por favor selecciona un método de pago.");
      return;
    }
    setError(""); // Si todo bien, podrías avanzar con el proceso de pago
    alert("¡Pedido realizado! (Simulado)");
  };

  return (
    <div className="checkout-main">
      <div className="checkout-form">
        <h2>Contact information</h2>
        {/* ... resto igual ... */}
        <input
          type="email"
          className="checkout-input"
          placeholder="Email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <div className="checkout-guest-note">You are currently checking out as a guest.</div>

        <h2>Billing address</h2>
        <p className="checkout-form-desc">
          Enter the billing address that matches your payment method.
        </p>
        <div className="checkout-address-card">
          <div><b>{userName}</b></div>
          <div>{userAddress}</div>
          <div>{userPhone}</div>
          <button className="checkout-edit-btn">Edit</button>
        </div>

        <h2>Payment options</h2>
        <div className="checkout-payment-methods">
          <label>
            <input
              type="radio"
              name="payment"
              value="credit"
              checked={paymentMethod === "credit"}
              onChange={() => setPaymentMethod("credit")}
            />
            Credit Card
          </label>
          <label>
            <input
              type="radio"
              name="payment"
              value="mercadopago"
              checked={paymentMethod === "mercadopago"}
              onChange={() => setPaymentMethod("mercadopago")}
            />
            MercadoPago
          </label>
          <label>
            <input
              type="radio"
              name="payment"
              value="paypal"
              checked={paymentMethod === "paypal"}
              onChange={() => setPaymentMethod("paypal")}
            />
            PayPal
          </label>
        </div>

        {/* Campos de tarjeta solo si corresponde */}
        {paymentMethod === "credit" && (
          <div className="checkout-card-fields">
            <input
              type="text"
              className="checkout-input"
              placeholder="Card Number"
              value={cardNumber}
              onChange={e => setCardNumber(e.target.value)}
              maxLength={19}
            />
            <input
              type="text"
              className="checkout-input"
              placeholder="Name on Card"
              value={cardName}
              onChange={e => setCardName(e.target.value)}
            />
          </div>
        )}

        {error && (
          <div className="checkout-error">
            <span>❗</span> {error}
          </div>
        )}

        <label className="checkout-note-row">
          <input
            type="checkbox"
            checked={!!note}
            onChange={e => setNote(e.target.checked ? "Agrega una nota a tu orden." : "")}
          />
          Add a note to your order
        </label>

        <div className="checkout-terms">
          By proceeding with your purchase you agree to our Terms and Conditions and Privacy Policy
        </div>

        <button className="checkout-place-order-btn" onClick={handleOrder}>Place Order</button>
        <div className="checkout-back-cart">
          &larr; Return to Cart
        </div>
      </div>
      {/* ... checkout-summary igual ... */}
      <div className="checkout-summary">
        <h3>Order summary</h3>
        {/* ... resto igual ... */}
        <div className="checkout-summary-list">
          {cart.map(item => (
            <div className="checkout-summary-item" key={item.id}>
              <img src={item.image} alt={item.title} className="checkout-summary-img" />
              <div className="checkout-summary-info">
                <div className="checkout-summary-title">{item.title}</div>
                <div className="checkout-summary-qty-price">
                  <span>x{item.quantity}</span>&nbsp;
                  <span>${item.price.toFixed(2)}</span>
                </div>
                {item.desc && (
                  <div className="checkout-summary-desc">{item.desc}</div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="checkout-summary-totals">
          <div className="checkout-summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="checkout-summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="checkout-summary-total">
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}