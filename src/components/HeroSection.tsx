import { useState } from 'react';
import BackgroundAnimation from './BackgroundAnimation';
import '../styles/HeroSection.css';

const HeroSection = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log('Newsletter signup:', email);
    setEmail('');
    alert('Thank you for signing up for our newsletter!');
  };

  return (
    <div className="hero-section">
      <BackgroundAnimation style={{ opacity: 0.2 }} />
      
      <div className="hero-content">
        <h1>Fast Hosting & Domains Made Easy</h1>
        <p>Experience lightning-fast hosting with 99.9% uptime guarantee and 24/7 support</p>
        
        <div className="hero-cta">
          <button className="cta-btn primary">Get Started</button>
          <button className="cta-btn secondary">Learn More</button>
        </div>
        
        <div className="hero-features">
          <div className="hero-feature">
            <div className="feature-icon">🚀</div>
            <span>Lightning Fast</span>
          </div>
          <div className="hero-feature">
            <div className="feature-icon">🔒</div>
            <span>Secure Hosting</span>
          </div>
          <div className="hero-feature">
            <div className="feature-icon">⚙️</div>
            <span>Easy Setup</span>
          </div>
          <div className="hero-feature">
            <div className="feature-icon">🔄</div>
            <span>24/7 Support</span>
          </div>
        </div>
      </div>
      
      <div className="hero-stats">
        <div className="stat-item">
          <h3>99.9%</h3>
          <p>Uptime Guarantee</p>
        </div>
        <div className="stat-item">
          <h3>24/7</h3>
          <p>Customer Support</p>
        </div>
        <div className="stat-item">
          <h3>10K+</h3>
          <p>Happy Customers</p>
        </div>
        <div className="stat-item">
          <h3>50+</h3>
          <p>Data Centers</p>
        </div>
      </div>
      
      <div className="newsletter-signup">
        <div className="newsletter-content">
          <h3>Stay Updated</h3>
          <p>Subscribe to our newsletter for the latest news and promotions</p>
          <form onSubmit={handleSubmit} className="newsletter-form">
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Enter your email" 
              required 
            />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
