import React, { useEffect, useRef, useState } from "react";
import Rating from "../components/Rating";

const ProductCarousel = () => {
  const [products, setProducts] = useState([]);
  const carouselRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchMen = fetch("https://fakestoreapi.com/products/category/men's clothing").then((res) => res.json());
    const fetchWomen = fetch("https://fakestoreapi.com/products/category/women's clothing").then((res) => res.json());
    const fetchFootwear = fetch("https://fakestoreapi.com/products/category/footwear").then((res) => res.json());

    Promise.all([fetchMen, fetchWomen, fetchFootwear])
      .then(([men, women, footwear]) => {
        const combined = [...men, ...women, ...footwear];
        const shuffled = combined.sort(() => Math.random() - 0.4).slice(0, 4);
        setProducts(shuffled);
      });
  }, []);

  const scrollCarousel = (direction) => {
    const scrollAmount = carouselRef.current.offsetWidth * 0.52;
    carouselRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="products-section">
      <div className="products-container">
        <div className="products-header">
          <h2>Recomendations</h2>
          <a href="#">See More</a>
        </div>

        <div className="carousel-wrapper">
          {isMobile && (
            <>
              <button className="carousel-btn left" onClick={() => scrollCarousel("left")}>&#8249;</button>
              <button className="carousel-btn right" onClick={() => scrollCarousel("right")}>&#8250;</button>
            </>
          )}

          <div className="products-grid" ref={carouselRef}>
            {products.map(product => (
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
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;
