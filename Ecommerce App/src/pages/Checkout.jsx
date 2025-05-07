// src/pages/Checkout.jsx

import React from "react";
import { useCart } from "../context/CartContext"; // Importar el hook
import CheckoutForm from "../components/CheckoutForm";

const Checkout = () => {
  const { cart, addToCart, removeFromCart } = useCart(); // Usar el hook para acceder al carrito

  return (
    <div>
      <h1>Checkout</h1>
      {/* Mostrar los productos del carrito */}
      <div>
        {cart.map((product) => (
          <div key={product.id}>
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <button onClick={() => removeFromCart(product.id)}>
              Remove from Cart
            </button>
          </div>
        ))}
      </div>

      <CheckoutForm />
    </div>
  );
};

export default Checkout;
