import { useEffect, useState } from 'react';
import BackgroundAnimation from './BackgroundAnimation';
import '../styles/HeroSection.css';

const HeroSection = () => {
  const [backgroundOpacity, setBackgroundOpacity] = useState(1);
  const [animationLoaded, setAnimationLoaded] = useState(false);

  // Adjust background opacity based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setBackgroundOpacity(0.8); // Reduce opacity on mobile for better readability
      } else {
        setBackgroundOpacity(1);
      }
    };

    // Set initial opacity
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Simulate animation loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="hero-section">
      {/* Apply fade-in effect to the background animation */}
      <div className={`background-animation-container ${animationLoaded ? 'loaded' : ''}`}>
        <BackgroundAnimation style={{ opacity: backgroundOpacity }} />
      </div>
      
      <div className="hero-content">
        <h1>Fast Hosting & Domains Made Easy</h1>
        <p>Experience lightning-fast hosting with 99.9% uptime guarantee and 24/7 support</p>
        
        <div className="hero-cta">
          <button className="cta-btn primary">Get Started</button>
          <button className="cta-btn secondary">Learn More</button>
        </div>
        
        <div className="hero-features">
          <div className="hero-feature">
            <div className="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span>Lightning Fast</span>
          </div>
          <div className="hero-feature">
            <div className="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
              </svg>
            </div>
            <span>Secure</span>
          </div>
          <div className="hero-feature">
            <div className="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z" />
              </svg>
            </div>
            <span>Reliable</span>
          </div>
          <div className="hero-feature">
            <div className="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3z" />
              </svg>
            </div>
            <span>Cloud-Based</span>
          </div>
          <div className="hero-feature">
            <div className="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
              </svg>
            </div>
            <span>24/7 Support</span>
          </div>
          <div className="hero-feature">
            <div className="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
              </svg>
            </div>
            <span>Global Network</span>
          </div>
        </div>
      </div>
      
      <div className="hero-stats">
        <div className="stat-item">
          <div className="stat-value">99.9%</div>
          <div className="stat-label">Uptime</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">24/7</div>
          <div className="stat-label">Support</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">100+</div>
          <div className="stat-label">Countries</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">10K+</div>
          <div className="stat-label">Customers</div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
