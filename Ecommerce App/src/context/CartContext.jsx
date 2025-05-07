import React, { createContext, useContext, useState } from "react";

// Crear un contexto vacío para el carrito
const CartContext = createContext();

// Proveedor del carrito para envolver la aplicación
export const CartProvider = ({ children }) => {
  // Estado del carrito, con un array vacío por defecto
  const [cart, setCart] = useState([]);

  // Función para agregar productos al carrito
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  // Función para quitar productos del carrito
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Devolver el proveedor del contexto con los valores necesarios
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook para usar el carrito en otros componentes
export const useCart = () => {
  return useContext(CartContext);
};