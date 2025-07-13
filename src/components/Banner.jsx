import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import banner1 from "../assets/banners/banner1.jpg";
import banner2 from "../assets/banners/banner2.jpg";
import banner3 from "../assets/banners/banner6.jpg";
import banner4 from "../assets/banners/banner5.jpg";

const banners = [banner1, banner2, banner3, banner4];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="banner-container">
      <img
        src={banners[currentIndex]}
        alt={`Banner ${currentIndex + 1}`}
        className="banner-image"
      /> 
      <div className="banner-overlay"></div>
      <div className="banner-text">
        <h1>Welcome to NovaStore</h1>
        <p>Discover the best products in one place</p>
        <Link to="/men" className="banner-btn">Explore Now</Link>
      </div>
    </div>
  );
}; 

export default Banner;

