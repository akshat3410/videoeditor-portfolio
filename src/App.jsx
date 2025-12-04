import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app">
      {/* Navbar */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="logo">LUXE EDITS</div>
        <ul className="nav-links">
          <li onClick={() => scrollToSection('home')}>Home</li>
          <li onClick={() => scrollToSection('portfolio')}>Portfolio</li>
          <li onClick={() => scrollToSection('about')}>About</li>
          <li onClick={() => scrollToSection('contact')}>Contact</li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          <span className="hero-subtitle">Premium Video Editing</span>
          <h1>Crafting Visual <br/> <span className="accent-text">Masterpieces</span></h1>
          <p>Elevating your raw footage into cinematic experiences with precision and style.</p>
          <div className="hero-buttons">
            <button className="btn primary" onClick={() => scrollToSection('portfolio')}>View Portfolio</button>
            <button className="btn secondary" onClick={() => scrollToSection('contact')}>Get in Touch</button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="image-container">
            <img src="mascot.png" alt="Creative Director Illustration" className="mascot-image" />
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="portfolio-section">
        <div className="section-header">
          <span className="section-tag">Selected Works</span>
          <h2 className="section-title">Curated Portfolio</h2>
        </div>
        
        <div className="portfolio-grid">
          {[
            { title: "Fashion Week 2024", category: "Event", desc: "Cinematic coverage of high-end fashion event." },
            { title: "Luxury Real Estate", category: "Commercial", desc: "Elegant tour of a $10M property." },
            { title: "Brand Identity", category: "Promo", desc: "Minimalist brand storytelling reel." },
            { title: "Travel Diaries", category: "Lifestyle", desc: "Atmospheric travel vlog editing." },
            { title: "Tech Unboxing", category: "Review", desc: "Clean, crisp product showcase." },
            { title: "Music Visualizer", category: "Art", desc: "Abstract visual accompaniment." }
          ].map((item, index) => (
            <div key={index} className="portfolio-card">
              <div className="card-image-placeholder"></div>
              <div className="card-content">
                <span className="card-category">{item.category}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <button className="text-link">Watch Project &rarr;</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="about-container">
          <div className="about-content">
            <span className="section-tag">About Me</span>
            <h2 className="section-title">The Art of the Cut</h2>
            <p className="bio-text">
              I believe that every frame matters. With a focus on minimalism and emotional resonance, 
              I transform chaotic footage into coherent, beautiful narratives. My style is defined by 
              clean cuts, perfect pacing, and a sophisticated color palette.
            </p>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-number">5+</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">100+</span>
                <span className="stat-label">Projects Delivered</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">100%</span>
                <span className="stat-label">Client Satisfaction</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="contact-wrapper">
          <div className="section-header">
            <span className="section-tag">Contact</span>
            <h2 className="section-title">Start Your Project</h2>
          </div>
          <form className="contact-form" onSubmit={(e) => { e.preventDefault(); alert('Thank you for your interest.'); }}>
            <div className="form-row">
              <div className="form-group">
                <label>Name</label>
                <input type="text" placeholder="John Doe" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="john@example.com" />
              </div>
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea rows="5" placeholder="Tell me about your vision..."></textarea>
            </div>
            <button type="submit" className="btn primary full-width">Send Inquiry</button>
          </form>
          
          <div className="contact-footer">
            <p>hello@luxeedits.com</p>
            <div className="social-links">
              <a href="#">Instagram</a>
              <a href="#">LinkedIn</a>
              <a href="#">Vimeo</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 Luxe Edits. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
