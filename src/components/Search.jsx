import React from "react";
import { useLocation } from "react-router-dom";

// Simulación de productos (puedes reemplazar por tu data real)
const PRODUCTS = [
  { id: 1, title: "Fore White Black Sneaker", price: 80, desc: "Footwear is essential for comfort, style, and protection." },
  { id: 2, title: "Classic Denim Jacket", price: 120, desc: "Timeless denim for all seasons." },
  { id: 3, title: "Elegant Red Dress", price: 99, desc: "Be the center of attention with this elegant dress." },
  { id: 4, title: "Sport Watch", price: 150, desc: "Track your workouts and stay stylish." },
  { id: 5, title: "Leather Wallet", price: 45, desc: "Premium leather with multiple compartments." }
];

// Helper para obtener el parámetro q
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Search() {
  const query = useQuery();
  const q = query.get("q") || "";
  const filtered = PRODUCTS.filter(
    product =>
      product.title.toLowerCase().includes(q.toLowerCase()) ||
      product.desc.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="search-page" style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 16px" }}>
      <h2 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: 24 }}>
        Resultados de búsqueda
      </h2>
      {q && (
        <div style={{ color: "#888", marginBottom: 22 }}>
          Mostrando resultados para: <strong>{q}</strong>
        </div>
      )}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "28px" }}>
        {filtered.length === 0 ? (
          <div style={{ fontSize: "1.17rem", color: "#d23c3c" }}>No se encontraron productos.</div>
        ) : (
          filtered.map(product => (
            <div
              key={product.id}
              style={{
                background: "#fafbfc",
                border: "1px solid #ececec",
                borderRadius: "11px",
                boxShadow: "0 2px 12px rgba(80,80,160,0.07)",
                padding: "26px 22px",
                minWidth: "220px",
                maxWidth: "320px",
                flex: "1 1 220px"
              }}
            >
              <div style={{ fontWeight: 600, fontSize: "1.18rem", marginBottom: 8 }}>
                {product.title}
              </div>
              <div style={{ fontSize: "1.09rem", color: "#222", marginBottom: 8 }}>
                ${product.price}
              </div>
              <div style={{ fontSize: "0.98rem", color: "#666" }}>
                {product.desc}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}