import React from "react";
import { useNavigate } from "react-router-dom";
import bannervideo from "../assets/banners/86378-592491844_small.mp4"; // Make sure the video path is correct
import newsletterImage from "../assets/banners/newsletterimage.jpg";

const InformativeSection = () => {
    console.log(bannervideo);
    const navigate = useNavigate();

    const handleShopNow = () => {
        navigate('/shop');
    };

    const handleSubscribe = () => {
        navigate('/blog');
    };
  return (
    <section className="informative-banner">
      <div className="video-container">
        <article className="banner-video-one">
          <div className="banner-video-content">
            <div className= "video-text">
            <h2> NovaStore is growing fast. </h2>
            <p>Explore with us new opportunities.</p>
            <button className="bannervideo-btn" onClick={handleShopNow}>Shop Now</button>
            </div>
          </div>
          {/* Video banner */}
          <video autoPlay loop muted className="bannervideo">
            <source src={bannervideo} type="video/mp4" />
            Your browser does not support this video format.
          </video>
        </article>
        <div className ="newsletter-container">
        <div className="newsletter-banner">
          <div className="newsletter-content">
            <h2>Join our newsletter. Enjoy big discounts.</h2>
            <p>Enjoy big discounts and latest updates right to your inbox.</p>
            <button className="btn-subscribe" onClick={handleSubscribe}>Subscribe Now</button>
          </div>
          <div className="newsletter-image">
            <img src={newsletterImage} alt="High heels" />
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};
export default InformativeSection;