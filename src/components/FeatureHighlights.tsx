import '../styles/FeatureHighlights.css';

const features = [
  {
    icon: '🚀',
    title: 'Lightning Fast',
    description: 'Our optimized servers ensure your website loads in milliseconds, not seconds.',
    color: '#2563eb'
  },
  {
    icon: '🔒',
    title: 'Enhanced Security',
    description: 'Advanced security measures to protect your website from threats and attacks.',
    color: '#10b981'
  },
  {
    icon: '⚙️',
    title: 'Easy Management',
    description: 'User-friendly control panel makes managing your website simple and intuitive.',
    color: '#8b5cf6'
  },
  {
    icon: '🔄',
    title: 'Automatic Backups',
    description: 'Daily automated backups ensure your data is always safe and recoverable.',
    color: '#f59e0b'
  }
];

const FeatureHighlights = () => {
  return (
    <div className="feature-highlights-container">
      <div className="feature-highlights-content">
        <div className="section-header">
          <h2>Hosting Features for Modern Websites</h2>
          <p>Everything you need to build and grow your online presence</p>
        </div>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon-container" style={{ backgroundColor: `${feature.color}20` }}>
                <div className="feature-icon" style={{ color: feature.color }}>{feature.icon}</div>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="feature-showcase">
          <div className="showcase-content">
            <h3>Powerful Control Panel</h3>
            <p>Manage your hosting with our intuitive control panel. Monitor performance, manage domains, and configure settings with ease.</p>
            <ul className="showcase-features">
              <li>
                <span className="check-icon">✓</span>
                One-click application installs
              </li>
              <li>
                <span className="check-icon">✓</span>
                Simple domain management
              </li>
              <li>
                <span className="check-icon">✓</span>
                Resource monitoring tools
              </li>
              <li>
                <span className="check-icon">✓</span>
                Email account configuration
              </li>
            </ul>
            <button className="learn-more-btn">Learn More</button>
          </div>
          <div className="showcase-image">
            <img 
              src="https://ik.imagekit.io/fazrinphcc/server-wordpress-768x532.png?updatedAt=1740701524989" 
              alt="Control Panel Dashboard" 
              className="feature-img"
            />
          </div>
        </div>
        
        <div className="feature-showcase reverse">
          <div className="showcase-content">
            <h3>Global CDN Network</h3>
            <p>Deliver your content faster with our global Content Delivery Network. Improve page load times and user experience worldwide.</p>
            <ul className="showcase-features">
              <li>
                <span className="check-icon">✓</span>
                50+ global data centers
              </li>
              <li>
                <span className="check-icon">✓</span>
                Automatic content caching
              </li>
              <li>
                <span className="check-icon">✓</span>
                DDoS protection included
              </li>
              <li>
                <span className="check-icon">✓</span>
                Real-time analytics
              </li>
            </ul>
            <button className="learn-more-btn">Learn More</button>
          </div>
          <div className="showcase-image">
            <img 
              src="https://ik.imagekit.io/fazrinphcc/migrate-hosting-img.png?updatedAt=1740701524956" 
              alt="Global CDN Map" 
              className="feature-img"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureHighlights;
