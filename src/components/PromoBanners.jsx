import React, { useEffect, useRef, useState } from 'react';
import banner1 from '../assets/banners/uji-kanggo-gumilang-LWxnYuEYSpE-unsplash.jpg';
import banner2 from '../assets/banners/antonio-verdin-fvH0Konesh8-unsplash.jpg';
import '../styles/PromoBanners.css';

const banners = [
  {
    className: 'gray',
    title: 'Shop Men',
    text: "Explore our latest men's collection",
    link: '/men',
    img: banner1,
    alt: 'Shop Men',
  },
  {
    className: 'blue',
    title: 'Shop Women',
    text: 'Discover the newest styles for her',
    link: '/women',
    img: banner2,
    alt: 'Shop Women',
  },
];

const PromoBanners = () => {
  const trackRef = useRef(null);
  const itemRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const trackEl = trackRef.current;
    if (!trackEl) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
            const idx = Number(entry.target.dataset.index);
            setActiveIndex(idx);
          }
        });
      },
      { root: trackEl, threshold: 0.6 }
    );

    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const goTo = (index) => {
    itemRefs.current[index]?.scrollIntoView({
      behavior: 'smooth',
      inline: 'start',
      block: 'nearest',
    });
  };

  return (
    <section className="promo-banners">
      <div className="container">
        <div className="promo-banners-track" ref={trackRef}>
          {banners.map((banner, index) => (
            <article
              className={`banner-box ${banner.className}`}
              key={banner.title}
              data-index={index}
              ref={(el) => (itemRefs.current[index] = el)}
            >
              <div className="banner-content">
                <section className="banner-text">
                  <h3>{banner.title}</h3>
                  <p>{banner.text}</p>
                  <a href={banner.link} className="banner-btn">
                    Shop Now
                  </a>
                </section>
                <figure className="banner-img-container">
                  <img src={banner.img} alt={banner.alt} className="banner-img" />
                </figure>
              </div>
            </article>
          ))}
        </div>

        <div className="promo-banners-dots">
          {banners.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`promo-banners-dot ${index === activeIndex ? 'active' : ''}`}
              onClick={() => goTo(index)}
              aria-label={`Ver banner ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoBanners;
