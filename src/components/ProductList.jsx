import React, { useEffect, useState } from "react";
import Rating from "../components/Rating"; // Asegúrate de que el componente Rating exista en tu proyecto

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMen = fetch("https://fakestoreapi.com/products/category/men's clothing").then((res) => res.json());
        const fetchWomen = fetch("https://fakestoreapi.com/products/category/women's clothing").then((res) => res.json());

        Promise.all([fetchMen, fetchWomen])
            .then(([menProducts, womenProducts]) => {
                const combined = [...menProducts, ...womenProducts].slice(0, 8);
                setProducts(combined);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error al obtener productos:", error);
                setLoading(false);
            });
    }, []);

    return (
      <section className="products-section">
          <div className="products-container"> 
  
              <div className="products-header">
                  <h2>Newest Products</h2>
                  <a href="#">See More</a>
              </div>
  
              {loading ? (
                  <p>Loading Products...</p>
              ) : (
                  <div className="products-grid">
                      {products.map((product) => (
                          <div key={product.id} className="product-card">
                              <div className="product-img">
                                  <img src={product.image} alt={product.title} />
                              </div>
                              <div className="product-title">{product.title}</div>
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
              )}
          </div> {/* cierre del container */}
      </section>
  );
};

export default ProductList;
