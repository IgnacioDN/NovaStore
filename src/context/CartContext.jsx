import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartModalOpen, setCartModalOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState(null);

  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        return prev.map((p) =>
          p.id === product.id
            ? { ...p, quantity: (p.quantity || 1) + quantity }
            : p
        );
      }
      return [...prev, { ...product, quantity }];
    });
    setLastAdded(product);
    setCartModalOpen(true);
  };

    // Sumar/restar cantidad de un producto
  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, (item.quantity || 1) + delta) }
          : item
      )
    );
  };

  

  const closeModal = () => setCartModalOpen(false);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        setCart,
        updateQty,
        isCartModalOpen,
        closeModal,
        lastAdded,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);