import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/InfoCintillo.css';

const items = [
  { icon: 'bi-shield-lock', label: 'Official Warranty' },
  { icon: 'bi-alarm', label: '24/7 Support' },
  { icon: 'bi-truck', label: 'Nationwide Shipping' },
  { icon: 'bi-credit-card', label: 'Card Discounts' },
];

function InfoCintillo() {
  return (
    <section className="info-cintillo">
      <div className="info-cintillo-track">
        {[...items, ...items].map((item, idx) => (
          <div className="info-item" key={idx}>
            <i className={`bi ${item.icon}`}></i>
            <p>{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default InfoCintillo;
