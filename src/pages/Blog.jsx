import React, { useState, useEffect } from 'react';
import '../styles/BlogLanding.css';
import summerTrends from '../assets/banners/bannertrends.jpg';
import aboutNovastore from "../assets/banners/banner3.jpg";
import careTips from "../assets/banners/caretips.jpg";
import bestSeller from "../assets/banners/bestsellers.jpg";

// Blog posts mock (English, fashion/e-commerce topics)
const featured = [
  {
    id: 1,
    title: "5 Summer Trends You Can't Miss in 2025",
    category: "Trends",
    excerpt: "Discover the must-have clothing styles and colors for this summer, curated by our NovaStore team.",
    author: "NovaStore Team",
    date: "Jul 2025",
    img: summerTrends
  },
  {
    id: 2,
    title: "How to Care for Your Favorite Clothes",
    category: "Care Tips",
    excerpt: "Extend the life of your garments with these easy care tips for every fabric.",
    author: "NovaStore Editors",
    date: "Jun 2025",
    img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80",
    imgCategory: careTips
  },
  {
    id: 3,
    title: "From Cart to Closet: Our Best-Selling Items",
    category: "Best Sellers",
    excerpt: "Explore our most popular pieces and why customers love them.",
    author: "NovaStore Team",
    date: "May 2025",
    img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
    imgCategory: bestSeller
  },
];

const allCategories = ["All", "Trends", "Care Tips", "Best Sellers", "Guides"];

const BlogLanding = () => {
  const [activeCat, setActiveCat] = useState("All");
  const posts = featured;

  const filtered = activeCat === "All"
    ? posts
    : posts.filter(
        p => p.category.trim().toLowerCase() === activeCat.trim().toLowerCase()
      );

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('reveal-visible');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll('.card').forEach(card => observer.observe(card));
    return () => observer.disconnect();
  }, [filtered]);

  return (
    <div className="blog-landing-wrapper">
      <section className="hero">
        <div className="hero-content">
          <h1>NovaStore Blog</h1>
          <p>
            Discover fashion tips, care guides, and the latest trends from NovaStore. Stay inspired and shop smarter every season.
          </p>
          <div className="hero-ctas">
            <button className="btn primary">Read Latest</button>
            <button className="btn outline">Subscribe</button>
          </div>
        </div>
        <div className="hero-bg" aria-hidden="true" />
      </section>

      <section className="categories">
        {allCategories.map(cat => (
          <button
            key={cat}
            className={`pill ${activeCat === cat ? 'active' : ''}`}
            onClick={() => setActiveCat(cat)}
          >
            {cat}
          </button>
        ))}
      </section>

      <section className="featured-grid">
        {activeCat === "Guides" ? (
          <div className="guides-info-card">
            <h2>Shopping & Fashion Guides</h2>
            <p>
              Welcome to our resource hub! Here you'll find guides to help you choose the perfect size, care for your clothing, build a capsule wardrobe, and make the most of your NovaStore experience.
            </p>
            <ul>
              <li>How to Find Your Perfect Fit</li>
              <li>Caring for Your Favorite Clothes</li>
              <li>Building a Capsule Wardrobe</li>
              <li>Shopping Online Safely</li>
              <li>Choosing Sustainable Fashion</li>
            </ul>
            <p>
              Want more tips? Subscribe to our newsletter for exclusive resources!
            </p>
          </div>
        ) : (
          filtered.map(post => (
            <article key={post.id} className="card featured">
              <div className="image-wrapper">
                <img
                  src={
                    activeCat !== "All" && post.imgCategory
                      ? post.imgCategory
                      : post.img
                  }
                  alt={post.title}
                  loading="lazy"
                />
              </div>
              <div className="info">
                <div className="meta">
                  <span className="category">{post.category}</span>
                  <span className="date">{post.date}</span>
                </div>
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
                <div className="foot">
                  <span className="author">{post.author}</span>
                  <button className="read-more">Read more →</button>
                </div>
              </div>
            </article>
          ))
        )}
      </section>

      <section className="newsletter-block">
        <div className="newsletter-inner">
          <div className="text">
            <h3>Subscribe to our newsletter</h3>
            <p>Get the latest fashion insights, care tips, and exclusive offers straight to your inbox.</p>
          </div>
          <form className="subscribe-form" onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder="Your email" aria-label="Email" required />
            <button className="btn-news">Subscribe</button>
          </form>
        </div>
      </section>

      <section className="about-author">
        <div className="author-card">
          <img src={aboutNovastore} alt="NovaStore Team" />
          <div className="bio">
            <h4>About NovaStore</h4>
            <p>
              NovaStore is dedicated to bringing you the latest in fashion, practical tips, and exclusive collections. Our team curates content to help you enjoy and care for your wardrobe.
            </p>
          </div>
        </div>
      </section>

      <section className="cta-final">
        <h2>Don't miss what's new</h2>
        <p>Subscribe to receive weekly posts and exclusive resources.</p>
        <button className="btn primary">Subscribe</button>
      </section>
    </div>
  );
};

export default BlogLanding;