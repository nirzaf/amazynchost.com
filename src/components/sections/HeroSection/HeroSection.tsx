import React, { useEffect, useState } from 'react';
import { classNames } from '../../../utils';
import { BaseProps } from '../../../types';
import { Button, Container } from '../../common';
import BackgroundAnimation from '../../BackgroundAnimation';
import './HeroSection.css';

export interface HeroSectionProps extends BaseProps {
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryButtonClick?: () => void;
  onSecondaryButtonClick?: () => void;
}

/**
 * Hero section component with animated background and content
 */
const HeroSection: React.FC<HeroSectionProps> = ({
  className,
  title = 'Fast Hosting & Domains Made Easy',
  subtitle = 'Experience lightning-fast hosting with 99.9% uptime guarantee and 24/7 support',
  primaryButtonText = 'Get Started',
  secondaryButtonText = 'Learn More',
  onPrimaryButtonClick,
  onSecondaryButtonClick,
  ...rest
}) => {
  const [backgroundOpacity, setBackgroundOpacity] = useState(1);
  const [animationLoaded, setAnimationLoaded] = useState(false);
  const [contentOpacity, setContentOpacity] = useState(0);
  const [contentVisible, setContentVisible] = useState(false);

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

  // Gradually increase content opacity
  useEffect(() => {
    if (animationLoaded) {
      // Make content visible but fully transparent
      setContentVisible(true);
      
      // Wait a short moment before starting the opacity animation
      const initialDelay = setTimeout(() => {
        // Start with very low opacity
        setContentOpacity(0.05);
        
        // Gradually increase opacity over 5 seconds
        const duration = 5000; // 5 seconds
        const interval = 50; // Update every 50ms
        const steps = duration / interval;
        const increment = 0.7 / steps; // From 0.05 to 1.0
        
        let currentStep = 0;
        const opacityTimer = setInterval(() => {
          currentStep++;
          if (currentStep >= steps) {
            setContentOpacity(1);
            clearInterval(opacityTimer);
          } else {
            setContentOpacity(0.05 + (increment * currentStep));
          }
        }, interval);
        
        return () => clearInterval(opacityTimer);
      }, 1000);
      
      return () => clearTimeout(initialDelay);
    }
  }, [animationLoaded]);

  return (
    <section 
      className={classNames('hero-section', className)} 
      {...rest}
    >
      {/* Apply fade-in effect to the background animation */}
      <div className={`background-animation-container ${animationLoaded ? 'loaded' : ''}`}>
        <BackgroundAnimation style={{ opacity: backgroundOpacity }} />
      </div>
      
      <Container>
        {contentVisible && (
          <>
            <div 
              className="hero-content" 
              style={{ 
                backgroundColor: `rgba(15, 23, 42, ${contentOpacity * 0.6})`,
                borderColor: `rgba(37, 99, 235, ${contentOpacity * 0.3})`,
                opacity: contentOpacity,
                transform: `translateY(${20 - (contentOpacity * 20)}px)`,
                transition: 'background-color 0.5s ease, border-color 0.5s ease, opacity 0.5s ease, transform 0.5s ease'
              }}
            >
              <h1>{title}</h1>
              <p>{subtitle}</p>
              
              <div className="hero-cta">
                <Button 
                  variant="outline" 
                  size="large" 
                  onClick={onPrimaryButtonClick}
                  style={{
                    color: 'white',
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    background: 'rgba(255, 255, 255, 0.1)'
                  }}
                >
                  {primaryButtonText}
                </Button>
                <Button 
                  variant="outline" 
                  size="large" 
                  onClick={onSecondaryButtonClick}
                  style={{
                    color: 'white',
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    background: 'rgba(255, 255, 255, 0.1)'
                  }}
                >
                  {secondaryButtonText}
                </Button>
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
                      <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
                    </svg>
                  </div>
                  <span>Affordable</span>
                </div>
              </div>
            </div>
            
            <div 
              className="hero-stats"
              style={{
                opacity: contentOpacity,
                transform: `translateY(${20 - (contentOpacity * 20)}px)`,
                transition: 'opacity 0.5s ease, transform 0.5s ease'
              }}
            >
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
          </>
        )}
      </Container>
    </section>
  );
};

export default HeroSection;
