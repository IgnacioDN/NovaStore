import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Rating from '../components/Rating';
import SizeSelectionModal from '../components/SizeSelectionModal';
import { useCart } from "../context/CartContext";
import { fixImageUrl, handleImageError } from "../utils/imageUtils";
import "../styles/ProductDetail.css";

// Sample reviews to show a random opinion
const randomReviews = [
  {
    name: "John P.",
    rating: 5,
    comment: "Excellent product! Arrived quickly and is of very good quality.",
    date: "2024-06-01"
  },
  {
    name: "Maria G.",
    rating: 4,
    comment: "Lives up to what was promised, would buy again.",
    date: "2024-07-12"
  },
  {
    name: "Peter R.",
    rating: 3,
    comment: "Good, but the packaging arrived a bit damaged.",
    date: "2024-05-15"
  }
];

const availableSizes = ["S", "M", "L", "XL"];

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(""); // State for size
  const [activeTab, setActiveTab] = useState('description');
  const [showSizeModal, setShowSizeModal] = useState(false);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Estado para reviews y formulario
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ name: "", rating: 0, comment: "" });
  

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => {
        // Fix the image URL
        const fixedProduct = {
          ...data,
          image: fixImageUrl(data.image)
        };
        setProduct(fixedProduct);
      });
    // Load a random review on component mount
    setReviews([randomReviews[Math.floor(Math.random() * randomReviews.length)]]);
  }, [id]);

  const handleDecrease = () => setQuantity(q => Math.max(1, q - 1));
  const handleIncrease = () => setQuantity(q => q + 1);

  // Para formulario de nueva opinión
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleStarClick = (star) => {
    setForm(f => ({ ...f, rating: star }));
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.rating && form.comment) {
      setReviews([
        ...reviews,
        {
          name: form.name,
          rating: Number(form.rating),
          comment: form.comment,
          date: (new Date()).toISOString().slice(0,10)
        }
      ]);
      setForm({ name: "", rating: 0, comment: "" });
    }
  };

  if (!product) {
    return (
      <div className="pdp-product-detail-container">
        <div className="pdp-product-images skeleton" />
        <div className="pdp-product-info">
          <div className="skeleton skeleton-title" />
          <div className="skeleton skeleton-price" />
          <div className="skeleton skeleton-rating" />
          <div className="skeleton skeleton-description" />
          <div className="skeleton skeleton-button" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="pdp-product-detail-container">
        <div className="pdp-product-images">
          <img 
            src={product.image} 
            alt={product.title} 
            className="pdp-main-image" 
            onError={handleImageError}
            loading="lazy"
          />
        </div>
        <div className="pdp-product-info">
          <h1 className="pdp-product-title">{product.title}</h1>
          <div className="pdp-product-price">${product.price}</div>
          <div className="pdp-product-rating">
            {product.rating && (
              <>
                <Rating value={product.rating.rate} />
                <span className="pdp-review-count">{product.rating.count} reviews</span>
              </>
            )}
          </div>
          <p className="pdp-product-description">{product.description}</p>
          <div className="pdp-add-to-cart-wrapper">
            {/* Size selector */}
      <div className="pdp-size-selector">
  <label className="pdp-size-label">Sizes</label>
  <div className="pdp-size-options">
    {availableSizes.map(size => (
      <button
        key={size}
        type="button"
        className={`pdp-size-btn${selectedSize === size ? " selected" : ""}`}
        onClick={() => setSelectedSize(size)}
      >
        {size}
      </button>
    ))}
  </div>
 
</div>
  <div className="pdp-cart-row">
    <button
      className="pdp-add-to-cart-btn"
      onClick={() => {
        if (!selectedSize) {
          setShowSizeModal(true);
          return;
        }
        addToCart({ ...product, size: selectedSize }, quantity); 
navigate("/cart");
      }}
    >
      Add to cart
    </button>
    <div className="pdp-quantity-selector">
      <button onClick={handleDecrease} className="pdp-qty-btn">-</button>
      <span className="pdp-qty-value">{quantity}</span>
      <button onClick={handleIncrease} className="pdp-qty-btn">+</button>
    </div>
  </div>
</div>
 <div className="pdp-product-benefits">
  <div className="pdp-benefit-item">
    <i className="fa-solid fa-truck"></i>
    <strong className="pdp-benefit-title">Free Shipping</strong>
    <span className="pdp-benefit-desc">Orders over $200</span>
  </div>
  <div className="pdp-benefit-item">
    <i className="fa-solid fa-shield-halved"></i>
    <strong className="pdp-benefit-title">30 Day Guarantee</strong>
    <span className="pdp-benefit-desc">Shop with confidence</span>
  </div>
  <div className="pdp-benefit-item">
    <i className="fa-solid fa-headset"></i>
    <strong className="pdp-benefit-title">Premium Support</strong>
    <span className="pdp-benefit-desc">7 days a week</span>
  </div>
  <div className="pdp-benefit-item">
    <i className="fa-solid fa-lock"></i>
    <strong className="pdp-benefit-title">Secure Payments</strong>
    <span className="pdp-benefit-desc">Protected checkout</span>
  </div>
</div>
        </div>
      </div>

      {/* VERTICAL TABS BLOCK - DOCUMENTATION STYLE */}
      <div className="pdp-details-tabs-vertical">
        <div className="pdp-tabs-sidebar">
          <button
            className={activeTab === 'description' ? 'active' : ''}
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
          <button
            className={activeTab === 'reviews' ? 'active' : ''}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews
          </button>
        </div>
        <div className="pdp-tabs-main-content">
          {activeTab === 'description' && (
            <div className="pdp-details-section">
              <h3 className="pdp-details-title">Product Description</h3>
              <p className="pdp-details-text">{product.description}</p>
            </div>
          )}
          {activeTab === 'reviews' && (
            <div className="pdp-details-section">
              <h3 className="pdp-details-title">Customer Reviews</h3>
              {product.rating && (
                <div className="pdp-details-reviews">
                  <Rating value={product.rating.rate} />
                  <span className="pdp-details-reviews-count">{product.rating.count} reviews</span>
                </div>
              )}

              {/* Customer reviews */}
              <div className="pdp-customer-opinions">
                {reviews.length > 0 ? reviews.map((r, idx) => (
                  <div className="pdp-customer-review" key={idx}>
                    <div className="pdp-customer-review-header">
                      <span className="pdp-customer-name">{r.name}</span>
                      <span className="pdp-customer-rating">
                        <Rating value={r.rating} />
                      </span>
                      <span className="pdp-customer-date">
                        {r.date}
                      </span>
                    </div>
                    <div className="pdp-customer-comment">{r.comment}</div>
                  </div>
                )) : <div>No reviews yet.</div>}
              </div>

              {/* Form for new review */}
              <form className="pdp-review-form" onSubmit={handleReviewSubmit}>
                <h4>Write your review</h4>
                <input
                  type="text"
                  placeholder="Your Name"
                  name="name"
                  value={form.name}
                  onChange={handleFormChange}
                  required
                />
                <div className="pdp-star-rating-input">
                  {[1,2,3,4,5].map(star => (
                    <span
                      key={star}
                      style={{
                        cursor: 'pointer',
                        color: form.rating >= star ? '#ffc107' : '#ddd',
                        fontSize: '1.5rem'
                      }}
                      onClick={() => handleStarClick(star)}
                      role="button"
                      aria-label={`Rate ${star}`}
                    >★</span>
                  ))}
                </div>
                <textarea
                  placeholder="Your comment..."
                  name="comment"
                  value={form.comment}
                  onChange={handleFormChange}
                  required
                  rows={3}
                />
                <button type="submit" className="pdp-add-to-cart-btn" style={{marginTop: 8}}>
                  Submit Review
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
      
      {/* Size Selection Modal */}
      <SizeSelectionModal 
        isOpen={showSizeModal} 
        onClose={() => setShowSizeModal(false)} 
      />
    </div>
  );
};

export default ProductDetail;