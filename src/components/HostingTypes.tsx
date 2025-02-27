import '../styles/HostingTypes.css';

const hostingTypes = [
  {
    icon: '🖥️',
    title: 'Shared Hosting',
    description: 'Perfect for small websites and blogs. Affordable and easy to set up.',
    features: [
      'Unlimited Websites',
      'Free SSL Certificate',
      'One-click WordPress Install',
      '24/7 Support'
    ],
    price: '$4.99',
    color: '#2563eb'
  },
  {
    icon: '⚡',
    title: 'VPS Hosting',
    description: 'Dedicated resources for growing websites with more traffic and complexity.',
    features: [
      'Dedicated vCPU & RAM',
      'Root Access',
      'SSD Storage',
      'Scalable Resources'
    ],
    price: '$14.99',
    color: '#10b981'
  },
  {
    icon: '🔌',
    title: 'Dedicated Server',
    description: 'Full control and maximum performance for high-traffic websites.',
    features: [
      'Full Hardware Control',
      'Maximum Performance',
      'Custom Configuration',
      'Enterprise Support'
    ],
    price: '$99.99',
    color: '#8b5cf6'
  },
  {
    icon: '☁️',
    title: 'Cloud Hosting',
    description: 'Scalable resources for variable traffic and high availability needs.',
    features: [
      'Auto-scaling',
      'Pay-as-you-go',
      'High Availability',
      'Global CDN Included'
    ],
    price: '$19.99',
    color: '#f59e0b'
  }
];

const HostingTypes = () => {
  return (
    <div className="hosting-types-container">
      <div className="hosting-types-content">
        <div className="section-header">
          <h2>Choose Your Hosting Solution</h2>
          <p>Select the hosting type that fits your needs and budget</p>
        </div>
        
        <div className="hosting-types-grid">
          {hostingTypes.map((type, index) => (
            <div key={index} className="hosting-type-card">
              <div className="hosting-type-header" style={{ backgroundColor: `${type.color}20` }}>
                <div className="hosting-icon" style={{ color: type.color }}>{type.icon}</div>
                <h3>{type.title}</h3>
                <p className="hosting-price">Starting at <span>{type.price}/mo</span></p>
              </div>
              <div className="hosting-type-body">
                <p className="hosting-description">{type.description}</p>
                <ul className="hosting-features">
                  {type.features.map((feature, i) => (
                    <li key={i}>
                      <span className="check-icon">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="hosting-cta" style={{ backgroundColor: type.color }}>
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="hosting-comparison">
          <button className="comparison-btn">Compare All Hosting Plans</button>
          <p>Not sure which hosting type is right for you? <a href="#">Contact our experts</a> for a personalized recommendation.</p>
        </div>
      </div>
    </div>
  );
};

export default HostingTypes;
