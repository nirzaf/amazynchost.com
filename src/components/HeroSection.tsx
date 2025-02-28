import HostingBackgroundWrapper from './HostingBackgroundWrapper';
import '../styles/HeroSection.css';

const HeroSection = () => {
  return (
    <div className="hero-section">
      <HostingBackgroundWrapper style={{ opacity: 0.8 }} />
      
      <div className="hero-content">
        <h1>Fast Hosting & Domains Made Easy</h1>
        <p>Experience lightning-fast hosting with 99.9% uptime guarantee and 24/7 support</p>
        
        <div className="hero-cta">
          <button className="cta-btn primary">Get Started</button>
          <button className="cta-btn secondary">Learn More</button>
        </div>
        
        <div className="hero-features">
          <div className="hero-feature">
            <div className="feature-icon" style={{ fontSize: '24px' }}>&#x1F680;</div>
            <span>Lightning Fast</span>
          </div>
          <div className="hero-feature">
            <div className="feature-icon" style={{ fontSize: '24px' }}>&#x1F510;</div>
            <span>Secure Hosting</span>
          </div>
          <div className="hero-feature">
            <div className="feature-icon" style={{ fontSize: '24px' }}>&#x2699;</div>
            <span>Easy Setup</span>
          </div>
          <div className="hero-feature">
            <div className="feature-icon" style={{ fontSize: '24px' }}>&#x1F504;</div>
            <span>24/7 Support</span>
          </div>
        </div>
      </div>
      
      <div className="hero-stats">
        <div className="stat-item">
          <div className="stat-value">99.9%</div>
          <div className="stat-label">Uptime Guarantee</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">24/7</div>
          <div className="stat-label">Customer Support</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">10K+</div>
          <div className="stat-label">Happy Customers</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">50+</div>
          <div className="stat-label">Data Centers</div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
