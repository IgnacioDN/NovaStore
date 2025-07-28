/* ORDEN DE LOS HOOKS

El orden de los hooks:  (React puede no ejecutar el hook correctamente si
 va después de un return o condicional).


 FLUJO LA CARD DE PRODUCTO:


1.Mové el hook useCart arriba.
2.Agregá un producto desde una PDP.
3.Andá al checkout (sin recargar la página).
4.Deberías ver el producto listado.

Como queda: */

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Rating from '../components/Rating';
import { useCart } from "../context/CartContext";
import "../styles/ProductDetail.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

// ... randomReviews igual ...

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart(); // <-- ¡MOVIDO ARRIBA!

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ name: "", rating: 0, comment: "" });

  // ... el resto igual ...

  /* Aclaracion para DEBUG si algo no se ve  

  Si algo sigue sin verse, agregá un <pre>{JSON.stringify(cart, null, 2)}</pre> 
  temporal en Checkout o CartModal para debug.

  */