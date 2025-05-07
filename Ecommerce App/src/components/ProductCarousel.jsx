import React, { useEffect, useState } from "react";
import Rating from "../components/Rating"; 

const ProductCarousel = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchMen = fetch("https://fakestoreapi.com/products/category/men's clothing").then((res) => res.json());
    const fetchWomen = fetch("https://fakestoreapi.com/products/category/women's clothing").then((res) => res.json());
    const fetchFootwear = fetch("https://fakestoreapi.com/products/category/footwear").then((res) => res.json());

    Promise.all([fetchMen, fetchWomen, fetchFootwear])
      .then(([menProducts, womenProducts, footwearProducts]) => {
        // Combinar los productos
        const combined = [...menProducts, ...womenProducts, ...footwearProducts];
        
        // Reordenarlos aleatoriamente
        const shuffled = combined.sort(() => Math.random() - 0.4).slice(0, 4); // Tomar 4 productos aleatorios
        setProducts(shuffled);
      })
      .catch((error) => {
        console.error("Error al obtener productos:", error);
      });
  }, []);

  return (
    <section className="products-section">
      <div className="container">
        <div className="products-header">
          <h2>Recomendations</h2>
          <a href="#">See More</a>
        </div>

        <div className="products-grid">
        {products.map(product => (
            <div key={product.id} className="product-card flex-shrink-0">
              <div className="product-img">
                <img src={product.image} alt={product.title} />
              </div>
              <div className="product-title">{product.title.slice(0, 50)}...</div>
              <div className="product-info">
                <div className="product-rating">
                  <Rating value={product.rating.rate} count={product.rating.count} />
                </div>
                <div className="product-price">${product.price}</div>
              </div>
              <button className="add-to-cart-btn">Add To Cart</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;