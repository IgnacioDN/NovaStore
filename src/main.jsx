// src/main.jsx o src/index.jsx (dependiendo de tu proyecto)

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CartProvider } from "./context/CartContext"; // Importar el CartProvider

ReactDOM.createRoot(document.getElementById("root")).render(
  <CartProvider>
    <App />
  </CartProvider>
);

