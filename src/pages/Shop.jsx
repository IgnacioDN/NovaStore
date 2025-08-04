import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import { useCart } from "../context/CartContext";
import "../styles/Shop.css";

const CATEGORY_LABELS = {
  "men's clothing": "Men",
  "women's clothing": "Women",
  "jewelery": "Accessories",
};

const CATEGORY_KEYS = Object.keys(CATEGORY_LABELS);

const Shop = () => {
  const [productsByCat, setProductsByCat] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  // Ref para el carousel de Women (sólo este tendrá flechas)
  const womenCarouselRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const responses = await Promise.all(
          CATEGORY_KEYS.map(cat =>
            fetch(`https://fakestoreapi.com/products/category/${encodeURIComponent(cat)}`)
              .then(res => {
                if (!res.ok) {
                  throw new Error(`Failed to fetch ${cat} products`);
                }
                return res.json();
              })
          )
        );
        
        const byCat = {};
        CATEGORY_KEYS.forEach((cat, idx) => {
          byCat[cat] = responses[idx] || [];
        });
        
        setProductsByCat(byCat);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Función para scrollear el carousel de Women
  const scrollWomen = (direction) => {
    const el = womenCarouselRef.current;
    if (el) {
      const containerWidth = el.offsetWidth;
      const scrollAmount = containerWidth * 0.8; // Scroll 80% of container width
      el.scrollBy({ 
        left: direction === "left" ? -scrollAmount : scrollAmount, 
        behavior: "smooth" 
      });
    }
  };

  if (loading) {
    return (
      <div className="shop-main-container">
        <div className="shop-loading">
          <div className="loading-spinner"></div>
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="shop-main-container">
        <div className="shop-error">
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="retry-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="shop-main-container" style={{ paddingBottom: 40 }}>
      <h1 className="shop-title" style={{ textAlign: "center", margin: "2rem 0 2.5rem 0" }}>Shop</h1>
      {CATEGORY_KEYS.map(cat => {
        const isWomen = cat === "women's clothing";
        const products = productsByCat[cat] || [];
        return (
          <section key={cat}>
            <div className="shop-carousel-header">
              <h2>{CATEGORY_LABELS[cat]}</h2>
            </div>
            <div className={`shop-carousel-wrapper${isWomen ? " women-carousel" : ""}`}>
              {/* Flechas solo para Women's carousel */}
              {isWomen && (
                <>
                  <button
                    className="shop-carousel-arrow left"
                    aria-label="Scroll left"
                    onClick={() => scrollWomen("left")}
                  >&#8249;</button>
                  <button
                    className="shop-carousel-arrow right"
                    aria-label="Scroll right"
                    onClick={() => scrollWomen("right")}
                  >&#8250;</button>
                </>
              )}
              <div
                className={`shop-carousel-products${isWomen ? " women-carousel-products" : ""}`}
                ref={isWomen ? womenCarouselRef : null}
              >
                {products.map(product => (
                  <div className="shop-carousel-card" key={product.id}>
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
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default Shop;