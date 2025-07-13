import React, { useEffect, useState } from "react";
import Rating from "../components/Rating";
import menBanner from "../assets/banners/man-815795_1280.jpg";

const MenCategory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPrice, setSelectedPrice] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/category/men's clothing")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching men's products:", error);
        setLoading(false);
      });
  }, []);

  // Filter logic
  const filteredProducts = products.filter(product => {
    if (!selectedPrice) return true;
    if (selectedPrice === 'low') return product.price < 30;
    if (selectedPrice === 'mid') return product.price >= 30 && product.price < 60;
    if (selectedPrice === 'high') return product.price >= 60;
    return true;
  });

  const FiltersSidebar = ({ isMobile = false, onClose }) => (
    <aside className={isMobile ? "sidebar-mobile-modal" : "sidebar-desktop"}>
      <div style={{ width: '100%', display: 'flex', alignItems: 'center', height: 56, marginBottom: 16 }}>
        <h4 style={{ fontSize: '1.05rem', fontWeight: 600, letterSpacing: 0.5, margin: 0, flex: 1, textAlign: 'center' }}>Filters</h4>
        {isMobile && (
          <button className="close-mobile-filters" onClick={onClose} title="Cerrar filtros">&times;</button>
        )}
      </div>
      {/* Price Filter */}
      <div style={{ marginBottom: 16, width: '100%' }}>
        <label style={{ fontWeight: 500, fontSize: '0.97rem', marginBottom: 6, display: 'block' }}>Price</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <label style={{ fontSize: '0.93rem' }}><input type="radio" name={isMobile ? "price-mobile" : "price"} value="" checked={selectedPrice === ''} onChange={() => setSelectedPrice('')} /> All</label>
          <label style={{ fontSize: '0.93rem' }}><input type="radio" name={isMobile ? "price-mobile" : "price"} value="low" checked={selectedPrice === 'low'} onChange={() => setSelectedPrice('low')} /> Under $30</label>
          <label style={{ fontSize: '0.93rem' }}><input type="radio" name={isMobile ? "price-mobile" : "price"} value="mid" checked={selectedPrice === 'mid'} onChange={() => setSelectedPrice('mid')} /> $30 - $59.99</label>
          <label style={{ fontSize: '0.93rem' }}><input type="radio" name={isMobile ? "price-mobile" : "price"} value="high" checked={selectedPrice === 'high'} onChange={() => setSelectedPrice('high')} /> $60 and up</label>
        </div>
      </div>
      {/* Sizes Filter */}
      <div style={{ marginBottom: 8, width: '100%' }}>
        <label style={{ fontWeight: 500, fontSize: '0.97rem', marginBottom: 6, display: 'block' }}>Sizes</label>
        <div className="sizes-list">
          <label className="size-filter">
            <input type="checkbox" id={(isMobile ? "mob-size-s" : "size-s")} name="size" value="S" /> S
          </label>
          <label className="size-filter">
            <input type="checkbox" id={(isMobile ? "mob-size-m" : "size-m")} name="size" value="M" /> M
          </label>
          <label className="size-filter">
            <input type="checkbox" id={(isMobile ? "mob-size-l" : "size-l")} name="size" value="L" /> L
          </label>
          <label className="size-filter">
            <input type="checkbox" id={(isMobile ? "mob-size-xl" : "size-xl")} name="size" value="XL" /> XL
          </label>
          <label className="size-filter">
            <input type="checkbox" id={(isMobile ? "mob-size-xxl" : "size-xxl")} name="size" value="XXL" /> XXL
          </label>
        </div>
      </div>
    </aside>
  );

  return (
    <section className="products-section" style={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
      {/* Banner */}
      <div style={{ width: '100%', marginBottom: 32, position: 'relative' }}>
        <img
          src={menBanner}
          alt="Men's Category Banner"
          style={{
            width: '100%',
            maxWidth: 1600,
            height: 300,
            objectFit: 'cover',
            display: 'block',
            margin: '0 auto',
            borderRadius: 0,
          }}
          className="category-banner-img"
        />
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0,0,0,0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <h1 style={{
            color: '#fff',
            fontSize: '2.5rem',
            fontWeight: 700,
            textShadow: '0 2px 12px rgba(0,0,0,0.7)',
            margin: 0,
            letterSpacing: 1,
            textAlign: 'center',
          }}>
            Men's Clothing
          </h1>
        </div>
      </div>
      {/* Main content: filters + grid */}
      <div className="category-main-content" style={{ display: 'flex', width: '100%', alignItems: 'flex-start', padding: 14 }}>
        {/* Desktop Sidebar */}
        <div className="sidebar-desktop-wrapper">
          <FiltersSidebar />
        </div>
        {/* Mobile: Ver Filtros btn */}
        <button
          className="show-mobile-filters-btn"
          onClick={() => setShowMobileFilters(true)}
        >
          Ver filtros
        </button>
        {/* Mobile: Drawer modal */}
        {showMobileFilters && (
          <div className="mobile-filters-modal-bg" onClick={() => setShowMobileFilters(false)}>
            <div className="stop-propagation" onClick={e => e.stopPropagation()}>
              <FiltersSidebar isMobile onClose={() => setShowMobileFilters(false)} />
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div className="container" style={{ flex: 1 }}>
          <div className="products-header">
            <h2>Men's Clothing</h2>
          </div>
          {loading ? (
            <p>Loading products...</p>
          ) : (
            <div className="product-grid-category product-grid-center-mobile" style={{ paddingBottom: 48 }}>
              {filteredProducts.map((product) => (
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
        </div>
      </div>
      <style>{`
        .sizes-list {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }
        .size-filter {
          display: flex;
          align-items: center;
          font-size: 0.97rem;
          gap: 7px;
          cursor: pointer;
          user-select: none;
        }
        .size-filter input[type="checkbox"] {
          margin: 0;
          accent-color: #333;
        }
        .show-mobile-filters-btn {
          display: none;
        }
        .mobile-filters-modal-bg {
          display: none;
        }
        .sidebar-desktop-wrapper {
          display: block;
        }
        .sidebar-desktop {
          min-width: 220px;
          max-width: 300px;
          margin-right: 32px;
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.04);
          padding: 14px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          border: 1px solid #ececec;
          box-sizing: border-box;
          position: sticky;
          top: 0;
          left: 0;
          z-index: 2;
        }
        .stop-propagation { height: 100%; }

        /* DESKTOP: 4 columnas grid */
        .product-grid-category {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
          justify-items: stretch;
        }
        .product-card {
          width: 100%;
          max-width: unset;
          min-width: 0;
          margin: 0 auto;
        }

        @media (max-width: 1200px) {
          .product-grid-category {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (max-width: 900px) {
          .category-banner-img {
            height: 200px !important;
          }
          .category-banner-img + div h1 {
            font-size: 1.5rem !important;
          }
          .product-grid-category {
            grid-template-columns: 1fr 1fr !important;
            gap: 16px !important;
          }
        }
        @media (max-width: 768px) {
          .category-main-content {
            flex-direction: column;
            align-items: stretch;
            padding: 0 2vw;
          }
          .sidebar-desktop-wrapper {
            display: none;
          }
          .show-mobile-filters-btn {
            display: block;
            margin: 0 auto 18px auto;
            background: #000;
            color: #fff;
            border: none;
            border-radius: 8px;
            padding: 10px 28px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
            width: fit-content;
          }
          .mobile-filters-modal-bg {
            display: flex;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 1000;
            background: rgba(0,0,0,0.28);
            align-items: flex-start;
            justify-content: flex-start;
          }
          .sidebar-mobile-modal {
            background: #fff;
            width: 85vw;
            max-width: 340px;
            min-height: 100vh;
            padding: 18px;
            border-radius: 0 8px 8px 0;
            box-shadow: 2px 0 10px rgba(0,0,0,0.07);
            overflow-y: auto;
            position: relative;
            display: flex;
            flex-direction: column;
            animation: slideInLeft 0.2s ease;
          }
          @keyframes slideInLeft {
            from { transform: translateX(-100%); }
            to { transform: translateX(0); }
          }
          .close-mobile-filters {
            background: none;
            border: none;
            font-size: 2rem;
            color: #333;
            cursor: pointer;
            position: absolute;
            top: 4px;
            right: 8px;
            line-height: 1;
            padding: 0;
          }
          .products-header {
            margin-top: 8px;
            margin-bottom: 12px;
            text-align: center;
          }
          .product-grid-category.product-grid-center-mobile {
            justify-content: center !important;
          }
        }
        @media (max-width: 600px) {
       
          .category-banner-img + div h1 {
            font-size: 1.1rem !important;
          }
          .product-grid-category {
            gap: 14px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default MenCategory;