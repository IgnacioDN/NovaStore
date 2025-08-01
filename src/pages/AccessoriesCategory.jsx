import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import accessoriesBanner from "../assets/banners/jewelry-5541848_1280.jpg";
import { useCart } from "../context/CartContext";

// Opciones de filtro
const orderOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: low to high", value: "priceLowHigh" },
  { label: "Price: high to low", value: "priceHighLow" },
  { label: "Name: A-Z", value: "nameAZ" },
  { label: "Name: Z-A", value: "nameZA" },
];
const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
const colors = [
  { name: 'Black', hex: '#222' },
  { name: 'White', hex: '#eee' },
  { name: 'Blue', hex: '#2564d6' },
  { name: 'Red', hex: '#d62323' },
  { name: 'Green', hex: '#38b638' },
  { name: 'Grey', hex: '#888' }
];

const ArrowSvg = ({ open }) => (
  <svg width="18" height="18" viewBox="0 0 22 22" style={{ display: 'inline-block', transition: 'transform .18s', transform: open ? "rotate(180deg)" : "none" }}>
    <path d="M6 9l5 5 5-5" stroke="#222" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const FilterIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" style={{marginRight: 14}}>
    <path d="M4 7h14M7 11h8M10 15h2" stroke="#222" strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const FilterDropdown = ({ label, open, onClick, children }) => (
  <div className={`filter-dropdown ${open ? "open" : ""}`}>
    <button className="filter-dropdown-btn" onClick={onClick}>
      <span className="filter-label">{label}</span>
      <ArrowSvg open={open} />
    </button>
    {open && <div className="filter-dropdown-content">{children}</div>}
  </div>
);

const AccessoriesCategory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

   // Filtros
   const [selectedPrice, setSelectedPrice] = useState('');
   const [selectedSizes, setSelectedSizes] = useState([]);
   const [selectedColors, setSelectedColors] = useState([]);
   const [orderBy, setOrderBy] = useState("featured");
   const [openDropdown, setOpenDropdown] = useState("");
   const [showMobileFilters, setShowMobileFilters] = useState(false);
 
   const { addToCart } = useCart();
 
   const handleAddToCart = (product) => {
     addToCart(product);
   };


  useEffect(() => {
    fetch("https://fakestoreapi.com/products/category/jewelery")
      .then((res) => res.json())
      .then((data) => {
        const enriched = data.map(product => ({
          ...product,
          size: sizes[Math.floor(Math.random() * sizes.length)],
          color: colors[Math.floor(Math.random() * colors.length)].name
        }));
        setProducts(enriched);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching accessories:", error);
        setLoading(false);
      });
  }, []);

  let filteredProducts = products.filter(product => {
    const matchPrice =
      !selectedPrice ||
      (selectedPrice === 'low' && product.price < 30) ||
      (selectedPrice === 'mid' && product.price >= 30 && product.price < 60) ||
      (selectedPrice === 'high' && product.price >= 60);

    const matchSize =
      selectedSizes.length === 0 || selectedSizes.includes(product.size);

    const matchColor =
      selectedColors.length === 0 || selectedColors.includes(product.color);

    return matchPrice && matchSize && matchColor;
  });

  if (orderBy === "priceLowHigh") filteredProducts.sort((a, b) => a.price - b.price);
  if (orderBy === "priceHighLow") filteredProducts.sort((a, b) => b.price - a.price);
  if (orderBy === "nameAZ") filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
  if (orderBy === "nameZA") filteredProducts.sort((a, b) => b.title.localeCompare(a.title));

  const toggleDropdown = (name) => {
    setOpenDropdown(prev => prev === name ? "" : name);
  };
  const toggleSize = (size) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };
  const toggleColor = (color) => {
    setSelectedColors(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

 // MODAL CONTENT: vertical options, selector left, text right
  const FiltersModalContent = () => (
    <div className="filters-modal-content">
      <div className="filters-modal-header">
        <span style={{fontWeight:600, fontSize:'1.8rem'}}>Filters</span>
        <button onClick={() => setShowMobileFilters(false)} className="close-filters-modal" aria-label="Close">&times;</button>
      </div>
      <div>
        <div className="filters-modal-section">
          <span className="filters-modal-label">Price</span>
          <div className="filter-options-list filter-options-vertical">
            <label><input type="radio" name="mob-price" value="" checked={selectedPrice === ''} onChange={() => setSelectedPrice('')} /><span>All</span></label>
            <label><input type="radio" name="mob-price" value="low" checked={selectedPrice === 'low'} onChange={() => setSelectedPrice('low')} /><span>Under $30</span></label>
            <label><input type="radio" name="mob-price" value="mid" checked={selectedPrice === 'mid'} onChange={() => setSelectedPrice('mid')} /><span>$30 - $59.99</span></label>
            <label><input type="radio" name="mob-price" value="high" checked={selectedPrice === 'high'} onChange={() => setSelectedPrice('high')} /><span>$60 and up</span></label>
          </div>
        </div>
        <div className="filters-modal-section">
          <span className="filters-modal-label">Sizes</span>
          <div className="filter-options-list filter-options-vertical">
            {sizes.map(size => (
              <label key={size}><input type="checkbox" checked={selectedSizes.includes(size)} onChange={() => toggleSize(size)} /><span>{size}</span></label>
            ))}
          </div>
        </div>
        <div className="filters-modal-section">
          <span className="filters-modal-label">Color</span>
          <div className="filter-options-list filter-options-vertical">
            {colors.map(color => (
              <label key={color.name}><input type="checkbox" checked={selectedColors.includes(color.name)} onChange={() => toggleColor(color.name)} /><span className="color-circle" style={{background: color.hex}}></span><span>{color.name}</span></label>
            ))}
          </div>
        </div>
        <div className="filters-modal-section">
          <span className="filters-modal-label">Order by</span>
          <div className="filter-options-list filter-options-vertical">
            {orderOptions.map(opt => (
              <label key={opt.value}><input type="radio" name="mob-orderby" value={opt.value} checked={orderBy === opt.value} onChange={() => setOrderBy(opt.value)} /><span>{opt.label}</span></label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

    const [showOrderBy, setShowOrderBy] = useState(false);
    const OrderByDropdownMobile = () => (
      <div className="order-mobile-dropdown">
        <button
          className="orderby-mobile-btn"
          onClick={() => setShowOrderBy(!showOrderBy)}
        >
          Order by <ArrowSvg open={showOrderBy} />
        </button>
        {showOrderBy && (
          <div className="order-mobile-dropdown-list">
            {orderOptions.map(opt => (
              <label key={opt.value} className="filter-radio">
                <input
                  type="radio"
                  name="orderby"
                  value={opt.value}
                  checked={orderBy === opt.value}
                  onChange={() => { setOrderBy(opt.value); setShowOrderBy(false); }}
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    );

   // MOBILE BAR: filtro izq, order derecha
  const MobileFiltersBar = () => (
    <div className="filters-mobile-bar mobile-only">
      <button className="show-mobile-filters-btn" onClick={() => setShowMobileFilters(true)}>
        <FilterIcon />
        <span>Filters</span>
      </button>
      <div style={{marginLeft: 'auto'}}>
        <OrderByDropdownMobile />
      </div>
    </div>
  );


   // DESKTOP BAR
  const FiltersBar = () => (
    <div className="category-filters-bar-wrap desktop-only">
      <div className="category-filters-bar-liner">
        <div className="category-filters-bar">
          <span className="category-filters-bar-icon">
            <FilterIcon />
            <span className="category-filters-bar-label">Filters</span>
          </span>
          <FilterDropdown
            label="Price"
            open={openDropdown === "price"}
            onClick={() => toggleDropdown("price")}
          >
            <div className="filter-options-list filter-options-vertical">
              <label><input type="radio" name="price" value="" checked={selectedPrice === ''} onChange={() => setSelectedPrice('')} /> All</label>
              <label><input type="radio" name="price" value="low" checked={selectedPrice === 'low'} onChange={() => setSelectedPrice('low')} /> Under $30</label>
              <label><input type="radio" name="price" value="mid" checked={selectedPrice === 'mid'} onChange={() => setSelectedPrice('mid')} /> $30 - $59.99</label>
              <label><input type="radio" name="price" value="high" checked={selectedPrice === 'high'} onChange={() => setSelectedPrice('high')} /> $60 and up</label>
            </div>
          </FilterDropdown>
          <FilterDropdown
            label="Sizes"
            open={openDropdown === "sizes"}
            onClick={() => toggleDropdown("sizes")}
          >
            <div className="filter-options-list filter-options-vertical">
              {sizes.map(size => (
                <label key={size} className="filter-checkbox">
                  <input
                    type="checkbox"
                    value={size}
                    checked={selectedSizes.includes(size)}
                    onChange={() => toggleSize(size)}
                  /> {size}
                </label>
              ))}
            </div>
          </FilterDropdown>
          <FilterDropdown
            label="Color"
            open={openDropdown === "color"}
            onClick={() => toggleDropdown("color")}
          >
            <div className="filter-options-list filter-options-vertical">
              {colors.map(color => (
                <label key={color.name} className="filter-checkbox">
                  <input
                    type="checkbox"
                    value={color.name}
                    checked={selectedColors.includes(color.name)}
                    onChange={() => toggleColor(color.name)}
                  /> 
                  <span className="color-circle" style={{background: color.hex}}></span>&nbsp;{color.name}
                </label>
              ))}
            </div>
          </FilterDropdown>
          <div className="category-orderby-bar" style={{ marginLeft: 'auto' }}>
            <FilterDropdown
              label="Order by"
              open={openDropdown === "orderby"}
              onClick={() => toggleDropdown("orderby")}
            >
              <div className="filter-options-list filter-options-vertical">
                {orderOptions.map(opt => (
                  <label key={opt.value} className="filter-radio">
                    <input
                      type="radio"
                      name="orderby"
                      value={opt.value}
                      checked={orderBy === opt.value}
                      onChange={() => setOrderBy(opt.value)}
                    /> {opt.label}
                  </label>
                ))}
              </div>
            </FilterDropdown>
          </div>
        </div>
      </div>
    </div>
  );


  return (
    <section className="products-section">
      {/* Banner */}
      <div style={{ width: '100%', marginBottom: 32, position: 'relative' }}>
        <img
          src={accessoriesBanner}
          alt="Accessories Category Banner"
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
            Accessories
          </h1>
        </div>
      </div>
     {/* Filtros desktop */}
      <FiltersBar />
      {/* Filtros mobile */}
      <MobileFiltersBar />
      {showMobileFilters && (
      <div className="filters-modal-bg" onClick={() => setShowMobileFilters(false)}>
        <div className="filters-modal-drawer" onClick={e => e.stopPropagation()}>
          <FiltersModalContent />
        </div>
      </div>
      )}
      {/* Grid y cards */}
      <div className="category-main-content" style={{ width: '100%', alignItems: 'flex-start', padding: 0, margin: "0 auto" }}>
        <div className="category-grid-layout">
          <div className="container">
            <div className="products-header">
              <h2>Accessories</h2>
            </div>
            {loading ? (
              <p>Loading products...</p>
            ) : (
              <div className="product-grid-category product-grid-center-mobile" style={{ paddingBottom: 48 }}>
                {filteredProducts.map((product) => (
                  <div key={product.id} className="product-card">
                    <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
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
                    </Link>
                    <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>Add To Cart</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <style>{`
        /* ----------- DESKTOP FILTERS/ORDER BAR (LIKE MEN) ----------- */
        .category-filters-bar-wrap {
          width: 100%;
          margin: 0 auto;
          display: flex;
          justify-content: center;
        }
        .category-filters-bar-liner {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          border-top: 1.5px solid #d7d8dc;
          border-bottom: 1.5px solid #d7d8dc;
          background: transparent;
          padding: 0;
        }

        .category-filters-bar {
         display: flex;
         align-items: center;
         gap: 1.5rem;
         width: 100%;
         margin-bottom: 0.8rem;
         margin-top: 0.8rem;
        flex-wrap: wrap;
       }

        .category-filters-bar-icon {
          display: flex;
          align-items: center;
          margin-right: 18px;
          height: 44px;
        }
        .category-filters-bar-label {
          font-size: 1.02rem;
          font-weight: 400;
          color: #333;
          margin-left: 4px;
          margin-right: 8px;
        }
        .filter-dropdown {
          position: relative;
          min-width: 140px;
        }
        .filter-dropdown-btn {
          width: 100%;
          min-width: 140px;
          height: 44px;
          border: 1px solid #b1b1b6;
          border-radius: 9px;
          font-size: 1.08rem;
          font-weight: 400;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 1.2rem;
          cursor: pointer;
          transition: border-color .12s;
          box-shadow: 0 2px 8px #00000007;
        }
        .filter-label {
          font-weight: 400;
          letter-spacing: 0.01em;
          font-size: 1.04rem;
        }
        .filter-dropdown-btn:focus {
          outline: none;
          border-color: #222;
        }
        .filter-dropdown-content {
          position: absolute;
          top: 48px;
          left: 0;
          min-width: 170px;
          max-width: 300px;
          background: #fff;
          box-shadow: 0 4px 16px #0003;
          border-radius: 10px;
          border: 1px solid #d6d7db;
          z-index: 10;
          padding: 16px 16px 12px 16px;
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
          animation: fadeIn .14s;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .filter-options-list {
          display: flex;
          flex-direction: column;
          gap: 11px;
        }
        .filter-options-vertical {
          display: flex !important;
          flex-direction: column !important;
          gap: 11px !important;
        }
        .filter-options-list label {
          font-size: 1.01rem;
          font-weight: 400;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .category-orderby-bar {
          margin-left: auto;
          min-width: 140px;
        }

        /* ----------- PRODUCT GRID DESKTOP ----------- */
        .product-grid-category {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
        }
        @media (max-width: 1200px) {
          .product-grid-category {
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
          }
        }
        @media (max-width: 900px) {
          .product-grid-category {
            grid-template-columns: repeat(2, 1fr);
            gap: 18px;
          }
        }

        /* ----------- MOBILE FILTERS/ORDER BAR ----------- */
        .desktop-only { display:block; }
        .mobile-only { display:none; }
        @media (max-width: 768px) {
          .category-filters-bar-wrap,
          .category-filters-bar-liner,
          .category-filters-bar {
            display: none !important;
          }
          .desktop-only { display:none; }
          .mobile-only { display:flex; align-items:center; width:100%; padding:0 6px; margin-bottom:11px; }
        }
        .show-mobile-filters-btn {
          border: 1px solid #adadad;
          border-radius: 10px;
          font-size: 1.05rem;
          font-weight: 600;
          padding: 10px 16px;
          box-shadow: 0 2px 8px #0001;
          cursor: pointer;
          display: flex;
          align-items: center;
        }
        .order-mobile-dropdown {
          position: relative;
          display: inline-block;
        }
        .orderby-mobile-btn {
          border: 1px solid #adadad;
          border-radius: 10px;
          font-size: 1.05rem;
          font-weight: 600;
          padding: 10px 16px;
          box-shadow: 0 2px 8px #0001;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .order-mobile-dropdown-list {
          position: absolute;
          right: 0;
          top: 44px;
          background: #fff;
          border: 1px solid #d6d7db;
          box-shadow: 0 4px 16px #0003;
          border-radius: 10px;
          z-index: 1001;
          padding: 10px 20px 10px 12px;
          min-width: 170px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .order-mobile-dropdown-list label {
          font-size: 1.01rem;
          font-weight: 400;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
        }

        /* ----------- MOBILE MODAL ----------- */
        .filters-modal-bg {
          position: fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,.25); z-index:10000; display:flex; align-items: stretch; justify-content: flex-start;
        }
        .filters-modal-drawer {
          background:#fff; width:86vw; max-width:370px; height:100vh; border-radius:0 18px 18px 0; box-shadow:2px 0 16px #0002; padding:22px 16px 22px 22px;
          animation: slideInLeft .22s;
        }
        @keyframes slideInLeft {
          from { transform: translateX(-100%); opacity: 0; }
          to   { transform: translateX(0); opacity: 1; }
        }
        .filter-options-list.filter-options-vertical {
          flex-direction: column;
        }
        .filter-options-list label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 1.02rem;
          margin-bottom: 7px;
        }

        /* ----------- PRODUCT GRID MOBILE ----------- */
        @media (max-width: 600px) {
          .category-main-content, .category-grid-layout, .container {
            max-width:430px !important;
            margin: 0 auto;
          }

          .product-grid-category {
            grid-template-columns: 1fr 1fr !important;
            gap: 12px !important;
            justify-items: center;
            align-items: stretch;
            width: 100%;
            margin: 0 auto;
            padding: 0 8px 24px 8px;
          }
          .product-card {
            min-width: 0;
            max-width: 100%;
            width: 100%;
            background: #fff;
            border-radius: 12px;
            box-shadow: 0 2px 10px #0001;
            padding: 0.7rem 0.6rem 0.7rem 0.6rem;
            margin: 0;
            display: flex;
            flex-direction: column;
            align-items: stretch;
          }
          .product-img {
            width: 100%;
            max-width: 120px;
            height: 120px;
            margin: 0 auto 0.7rem auto;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 10px;
          }
          .product-card img {
            width: 95%;
            height: 95%;
            object-fit: contain;
            max-width: 110px;
            max-height: 110px;
          }
          .products-header h2 { display: none}
          .product-title {
            font-size: 0.8rem;
            line-height: 1.2;
            max-height: 2.4em;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .product-price { font-size: 1.05rem; margin-bottom: 0.5rem; }
          .product-rating { font-size: 0.95rem; }
          .add-to-cart-btn { font-size: 0.8rem; padding: 0.5rem 0; }
          .product-card { padding: 0.7rem 0.6rem 0.7rem 0.6rem; }
        }
        .order-mobile .filter-options-list { margin-bottom: 0; }
        .close-filters-modal {
          border-radius: 8px;
          align-self: flex-end !important;
          border: 1px solid #c2c2c2;
          margin-left: 10px;
        }
      `}</style>
    </section>
  );
};
export default AccessoriesCategory;