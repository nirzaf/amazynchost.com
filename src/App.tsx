import { useState } from 'react'
import './App.css'

function App() {
  const [selectedPlan, setSelectedPlan] = useState('premium');

  return (
    <div className="app-container">
      {/* Hero Section */}
      <header className="hero-section">
        <nav className="navbar">
          <div className="logo">AmazyncHost</div>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#support">Support</a>
            <a href="#contact">Contact</a>
          </div>
          <button className="login-btn">Login</button>
        </nav>
        <div className="hero-content">
          <h1>Fast & Secure Web Hosting</h1>
          <p>Experience lightning-fast hosting with 99.9% uptime guarantee and 24/7 support</p>
          <div className="hero-cta">
            <button className="cta-btn primary">Get Started</button>
            <button className="cta-btn secondary">Learn More</button>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="features-section" id="features">
        <div className="section-header">
          <h2>Hosting Features for Modern Websites</h2>
          <p>Everything you need to build and grow your online presence</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3>Lightning Fast</h3>
            <p>Optimized servers for maximum performance and speed</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure Hosting</h3>
            <p>Advanced security features to protect your website</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚙️</div>
            <h3>Easy Management</h3>
            <p>User-friendly control panel for simple site management</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Mobile Optimized</h3>
            <p>Responsive hosting for all devices and screen sizes</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔄</div>
            <h3>Auto Backups</h3>
            <p>Daily automated backups to keep your data safe</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌐</div>
            <h3>Global CDN</h3>
            <p>Content delivery network for faster global access</p>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="stats-section">
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
      </section>

      {/* Pricing Section */}
      <section className="pricing-section" id="pricing">
        <div className="section-header">
          <h2>Our Hosting Plans</h2>
          <p>Choose the perfect hosting plan for your needs</p>
        </div>
        <div className="pricing-tabs">
          <button 
            className={`tab-btn ${selectedPlan === 'basic' ? 'active' : ''}`}
            onClick={() => setSelectedPlan('basic')}
          >
            Basic
          </button>
          <button 
            className={`tab-btn ${selectedPlan === 'premium' ? 'active' : ''}`}
            onClick={() => setSelectedPlan('premium')}
          >
            Premium
          </button>
          <button 
            className={`tab-btn ${selectedPlan === 'business' ? 'active' : ''}`}
            onClick={() => setSelectedPlan('business')}
          >
            Business
          </button>
          <button 
            className={`tab-btn ${selectedPlan === 'enterprise' ? 'active' : ''}`}
            onClick={() => setSelectedPlan('enterprise')}
          >
            Enterprise
          </button>
        </div>
        <div className="pricing-cards">
          <div className="pricing-card">
            <h3>Starter</h3>
            <div className="price">$4.99<span>/mo</span></div>
            <ul className="features-list">
              <li>1 Website</li>
              <li>10GB SSD Storage</li>
              <li>Unmetered Bandwidth</li>
              <li>Free SSL Certificate</li>
              <li>1 Email Account</li>
              <li>24/7 Support</li>
            </ul>
            <button className="pricing-btn">Select Plan</button>
          </div>
          <div className="pricing-card featured">
            <div className="popular-tag">Most Popular</div>
            <h3>Premium</h3>
            <div className="price">$9.99<span>/mo</span></div>
            <ul className="features-list">
              <li>Unlimited Websites</li>
              <li>100GB SSD Storage</li>
              <li>Unmetered Bandwidth</li>
              <li>Free SSL Certificate</li>
              <li>Unlimited Email Accounts</li>
              <li>Free Domain for 1 Year</li>
              <li>Priority Support</li>
            </ul>
            <button className="pricing-btn">Select Plan</button>
          </div>
          <div className="pricing-card">
            <h3>Business</h3>
            <div className="price">$14.99<span>/mo</span></div>
            <ul className="features-list">
              <li>Unlimited Websites</li>
              <li>200GB SSD Storage</li>
              <li>Unmetered Bandwidth</li>
              <li>Free SSL Certificate</li>
              <li>Unlimited Email Accounts</li>
              <li>Free Domain for 1 Year</li>
              <li>Priority Support</li>
              <li>Daily Backups</li>
            </ul>
            <button className="pricing-btn">Select Plan</button>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="search-section">
        <div className="search-container">
          <h2>Search Domains</h2>
          <div className="search-box">
            <input type="text" placeholder="Find your perfect domain name..." />
            <button className="search-btn">Search</button>
          </div>
        </div>
      </section>

      {/* Hosting Types Section */}
      <section className="hosting-types-section">
        <div className="section-header">
          <h2>Hosting Types We Offer</h2>
          <p>Choose the hosting solution that fits your needs</p>
        </div>
        <div className="hosting-types-grid">
          <div className="hosting-type-card">
            <div className="hosting-icon">🖥️</div>
            <h3>Shared Hosting</h3>
            <p>Perfect for small websites and blogs</p>
            <button className="hosting-btn">Learn More</button>
          </div>
          <div className="hosting-type-card">
            <div className="hosting-icon">⚡</div>
            <h3>VPS Hosting</h3>
            <p>Dedicated resources for growing websites</p>
            <button className="hosting-btn">Learn More</button>
          </div>
          <div className="hosting-type-card">
            <div className="hosting-icon">🔌</div>
            <h3>Dedicated Server</h3>
            <p>Full control and maximum performance</p>
            <button className="hosting-btn">Learn More</button>
          </div>
          <div className="hosting-type-card">
            <div className="hosting-icon">☁️</div>
            <h3>Cloud Hosting</h3>
            <p>Scalable resources for variable traffic</p>
            <button className="hosting-btn">Learn More</button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Get Started?</h2>
          <p>Join thousands of satisfied customers today</p>
          <button className="cta-button">Get Started Now</button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="section-header">
          <h2>What Our Customers Say</h2>
          <p>Trusted by thousands of businesses worldwide</p>
        </div>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="quote">"AmazyncHost has been a game-changer for our business. The speed and reliability are unmatched!"</div>
            <div className="author">- Sarah Johnson, Tech Startup</div>
          </div>
          <div className="testimonial-card">
            <div className="quote">"The customer support team is incredible. They've helped us resolve issues quickly and efficiently."</div>
            <div className="author">- Michael Chen, E-commerce Store</div>
          </div>
          <div className="testimonial-card">
            <div className="quote">"We've tried many hosting providers, but AmazyncHost offers the best value for the features provided."</div>
            <div className="author">- Emily Rodriguez, Blog Owner</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-column">
            <h3>AmazyncHost</h3>
            <p>Fast, secure, and reliable web hosting for businesses of all sizes.</p>
            <div className="social-icons">
              <a href="#" className="social-icon">FB</a>
              <a href="#" className="social-icon">TW</a>
              <a href="#" className="social-icon">IG</a>
              <a href="#" className="social-icon">LI</a>
            </div>
          </div>
          <div className="footer-column">
            <h4>Company</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Press</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Services</h4>
            <ul>
              <li><a href="#">Web Hosting</a></li>
              <li><a href="#">VPS Hosting</a></li>
              <li><a href="#">Dedicated Servers</a></li>
              <li><a href="#">Domain Registration</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Support</h4>
            <ul>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Status</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 AmazyncHost. All rights reserved.</p>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Legal</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
