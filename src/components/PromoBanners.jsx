import React from "react";
import banner1 from "../assets/banners/uji-kanggo-gumilang-LWxnYuEYSpE-unsplash.jpg";
import banner2 from "../assets/banners/antonio-verdin-fvH0Konesh8-unsplash.jpg";

const PromoBanners = () => {
    return (
      <section className="promo-banners">
        <div className="container">
          <article className="banner-box gray">
            <div className="banner-content">
              <section className="banner-text">
                <h3>Shop Men</h3>
                <p>Explore our latest men's collection</p>
                <a href="/men" className="banner-btn">Shop Now</a>
              </section>
              <figure className="banner-img-container">
                <img src={banner1} alt="Shop Men" className="banner-img" />
              </figure>
            </div>
          </article>
  
          <article className="banner-box blue">
            <div className="banner-content">
              <section className="banner-text">
                <h3>Shop Women</h3>
                <p>Discover the newest styles for her</p>
                <a href="/women" className="banner-btn">Shop Now</a>
              </section>
              <figure className="banner-img-container">
                <img src={banner2} alt="Shop Women" className="banner-img" />
              </figure>
            </div>
          </article>
        </div>
      </section>
    );
  };
  
export default PromoBanners;
