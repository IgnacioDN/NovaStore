import React, { useEffect, useState } from "react";
import Rating from "../components/Rating";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom"; // <--- Add import

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

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
                  <Link to={`/product/${product.id}`}>
                    <img src={product.image} alt={product.title} />
                  </Link>
                </div>
                <div className="product-title">
                  <Link to={`/product/${product.id}`} style={{ color: "inherit", textDecoration: "none" }}>
                    {product.title}
                  </Link>
                </div>
                <div className="product-info">
                  <div className="product-rating">
                    <Rating value={product.rating.rate} count={product.rating.count} />
                  </div>
                  <div className="product-price">${product.price}</div>
                </div>
                <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
                  Add To Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductList;