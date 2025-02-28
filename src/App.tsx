import './App.css'
import { useState } from 'react'
import HeroSection from './components/HeroSection'
import FeatureHighlights from './components/FeatureHighlights'
import HostingTypes from './components/HostingTypes'
import DomainSearch from './components/DomainSearch'
import PricingPlans from './components/PricingPlans'
import Testimonials from './components/Testimonials'

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="app-container">
      <header className="main-header">
        <div className="header-content">
          <div className="logo">
            <span>AmazyncHost</span>
          </div>
          <div className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <nav className={`main-nav ${mobileMenuOpen ? 'active' : ''}`}>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Hosting</a></li>
              <li><a href="#">Domains</a></li>
              <li><a href="#">Features</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </nav>
          <div className="header-buttons">
            <button className="login-btn">Login</button>
            <button className="signup-btn">Sign Up</button>
          </div>
        </div>
      </header>
      
      <main>
        <HeroSection />
        <FeatureHighlights />
        <HostingTypes />
        <DomainSearch />
        <PricingPlans />
        <Testimonials />
      </main>
      
      <footer className="main-footer">
        <div className="footer-content">
          <div className="footer-grid">
            <div className="footer-column">
              <h3>AmazyncHost</h3>
              <p>Providing reliable hosting solutions since 2010. Our mission is to help businesses of all sizes establish their online presence with ease.</p>
              <div className="social-links">
                <a href="#" aria-label="Facebook">
                  <i className="social-icon">f</i>
                </a>
                <a href="#" aria-label="Twitter">
                  <i className="social-icon">t</i>
                </a>
                <a href="#" aria-label="Instagram">
                  <i className="social-icon">i</i>
                </a>
                <a href="#" aria-label="LinkedIn">
                  <i className="social-icon">l</i>
                </a>
              </div>
            </div>
            
            <div className="footer-column">
              <h4>Hosting</h4>
              <ul>
                <li><a href="#">Shared Hosting</a></li>
                <li><a href="#">VPS Hosting</a></li>
                <li><a href="#">Dedicated Servers</a></li>
                <li><a href="#">Cloud Hosting</a></li>
                <li><a href="#">WordPress Hosting</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h4>Domains</h4>
              <ul>
                <li><a href="#">Domain Registration</a></li>
                <li><a href="#">Domain Transfer</a></li>
                <li><a href="#">Domain Pricing</a></li>
                <li><a href="#">WHOIS Lookup</a></li>
                <li><a href="#">Domain Extensions</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h4>Support</h4>
              <ul>
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Knowledge Base</a></li>
                <li><a href="#">Community Forum</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">System Status</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h4>Company</h4>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Press</a></li>
                <li><a href="#">Partners</a></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <div className="copyright">
              <p>&copy; 2023 AmazyncHost. All rights reserved.</p>
            </div>
            <div className="footer-links">
              <a href="#">Terms of Service</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Cookie Policy</a>
              <a href="#">GDPR</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
