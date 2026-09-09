import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/InfoCintillo.css';

const items = [
  { icon: 'bi-shield-lock', label: 'Official Warranty' },
  { icon: 'bi-alarm', label: '24/7 Support' },
  { icon: 'bi-truck', label: 'Nationwide Shipping' },
  { icon: 'bi-credit-card', label: 'Card Discounts' },
];

// Agrupa los 4 items en páginas de a 2, para mobile
const pages = [
  [items[0], items[1]],
  [items[2], items[3]],
];

function InfoCintillo() {
  const trackRef = useRef(null);
  const pageRefs = useRef([]);
  const [activePage, setActivePage] = useState(0);

  useEffect(() => {
    const trackEl = trackRef.current;
    if (!trackEl) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
            const idx = Number(entry.target.dataset.pageIndex);
            setActivePage(idx);
          }
        });
      },
      { root: trackEl, threshold: 0.6 }
    );

    pageRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const goToPage = (index) => {
    pageRefs.current[index]?.scrollIntoView({
      behavior: 'smooth',
      inline: 'start',
      block: 'nearest',
    });
  };

  return (
    <section className="ns-cintillo">
      {/* Desktop: los 4 en una sola fila, sin dots */}
      <div className="ns-cintillo-desktop-row">
        {items.map((item, idx) => (
          <div className="ns-cintillo-item" key={idx}>
            <i className={`bi ${item.icon}`}></i>
            <p>{item.label}</p>
          </div>
        ))}
      </div>

      {/* Mobile: carrusel de páginas de a 2, con dots */}
      <div className="ns-cintillo-mobile-track" ref={trackRef}>
        {pages.map((page, pageIndex) => (
          <div
            className="ns-cintillo-page"
            key={pageIndex}
            data-page-index={pageIndex}
            ref={(el) => (pageRefs.current[pageIndex] = el)}
          >
            {page.map((item, idx) => (
              <div className="ns-cintillo-item" key={idx}>
                <i className={`bi ${item.icon}`}></i>
                <p>{item.label}</p>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="ns-cintillo-dots">
        {pages.map((_, idx) => (
          <button
            key={idx}
            type="button"
            className={`ns-cintillo-dot ${idx === activePage ? 'active' : ''}`}
            onClick={() => goToPage(idx)}
            aria-label={`Ver página ${idx + 1}`}
          ></button>
        ))}
      </div>
    </section>
  );
}

export default InfoCintillo;
