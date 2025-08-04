import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Rating from "./Rating";
import { useCart } from "../context/CartContext";
import "../styles/Shop.css";

// Helper para obtener el parámetro q
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Search() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const query = useQuery();
  const q = query.get("q") || "";
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Fetch only fashion-related categories that match NovaStore
        const categories = ["men's clothing", "women's clothing", "jewelery"];
        const responses = await Promise.all(
          categories.map(category =>
            fetch(`https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`)
              .then(res => res.json())
          )
        );
        
        // Flatten all products from fashion categories
        const allFashionProducts = responses.flat();
        setProducts(allFashionProducts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(q.toLowerCase()) ||
    product.description.toLowerCase().includes(q.toLowerCase()) ||
    product.category.toLowerCase().includes(q.toLowerCase())
  );

  if (loading) {
    return (
      <div className="search-page">
        <div className="search-loading">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="search-page">
        <div className="search-error">Error loading products: {error}</div>
      </div>
    );
  }

  return (
    <div className="search-page">
      <div className="search-header">
        <h1 className="search-title">Search Results</h1>
        {q && (
          <div className="search-query">
            Showing results for: <strong>"{q}"</strong>
          </div>
        )}
        <div className="search-count">
          {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
        </div>
      </div>

      <div className="search-results">
        {filteredProducts.length === 0 ? (
          <div className="search-no-results">
            <h3>No products found</h3>
            <p>Try searching for something else or browse our categories.</p>
          </div>
        ) : (
          <div className="search-products-grid">
            {filteredProducts.map(product => (
              <div className="shop-carousel-card search-product-card" key={product.id}>
                <div className="shop-carousel-img">
                  <Link to={`/product/${product.id}`}>
                    <img src={product.image} alt={product.title} />
                  </Link>
                </div>
                <div className="shop-carousel-title">
                  <Link to={`/product/${product.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {product.title}
                  </Link>
                </div>
                <div className="shop-carousel-rating">
                  <Rating value={product.rating?.rate} count={product.rating?.count} />
                </div>
                <div className="shop-carousel-price">${product.price}</div>
                <button className="shop-carousel-add-btn" onClick={() => addToCart(product)}>
                  Add To Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}