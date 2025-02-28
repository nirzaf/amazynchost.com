import '../styles/HostingTypes.css';
import { useState } from 'react';

const pricingPlans = [
  {
    title: 'Basic',
    description: 'Perfect for small personal websites and blogs',
    price: '4.99',
    color: '#2563eb',
    popular: false,
    features: [
      { name: '1 Website', included: true },
      { name: '10GB SSD Storage', included: true },
      { name: 'Unmetered Bandwidth', included: true },
      { name: 'Free SSL Certificate', included: true },
      { name: '1 Email Account', included: true },
      { name: '24/7 Support', included: true },
      { name: 'Daily Backups', included: false },
      { name: 'CDN Integration', included: false }
    ]
  },
  {
    title: 'Premium',
    description: 'Great for businesses and professional websites',
    price: '9.99',
    color: '#2563eb',
    popular: true,
    features: [
      { name: 'Unlimited Websites', included: true },
      { name: '100GB SSD Storage', included: true },
      { name: 'Unmetered Bandwidth', included: true },
      { name: 'Free SSL Certificate', included: true },
      { name: 'Unlimited Email Accounts', included: true },
      { name: 'Free Domain for 1 Year', included: true },
      { name: 'Priority Support', included: true },
      { name: 'Daily Backups', included: false }
    ]
  },
  {
    title: 'Business',
    description: 'Advanced features for high-traffic websites',
    price: '14.99',
    color: '#2563eb',
    popular: false,
    features: [
      { name: 'Unlimited Websites', included: true },
      { name: '200GB SSD Storage', included: true },
      { name: 'Unmetered Bandwidth', included: true },
      { name: 'Free SSL Certificate', included: true },
      { name: 'Unlimited Email Accounts', included: true },
      { name: 'Free Domain for 1 Year', included: true },
      { name: 'Priority Support', included: true },
      { name: 'Daily Backups', included: true }
    ]
  },
  {
    title: 'Enterprise',
    description: 'Maximum performance for high-demand applications',
    price: '24.99',
    color: '#2563eb',
    popular: false,
    features: [
      { name: 'Unlimited Websites', included: true },
      { name: '500GB SSD Storage', included: true },
      { name: 'Unmetered Bandwidth', included: true },
      { name: 'Free SSL Certificate', included: true },
      { name: 'Unlimited Email Accounts', included: true },
      { name: 'Free Domain for 1 Year', included: true },
      { name: 'Priority Support', included: true },
      { name: 'Daily Backups', included: true }
    ]
  }
];

const HostingTypes = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  
  return (
    <div className="hosting-types-container">
      <div className="hosting-types-content">
        <div className="section-header">
          <h2>Choose Your Hosting Plan</h2>
          <p>Select the perfect hosting solution for your needs</p>
          
          <div className="billing-toggle">
            <span className={billingPeriod === 'monthly' ? 'active' : ''}>Monthly</span>
            <label className="switch">
              <input 
                type="checkbox" 
                checked={billingPeriod === 'yearly'} 
                onChange={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
              />
              <span className="slider round"></span>
            </label>
            <span className={billingPeriod === 'yearly' ? 'active' : ''}>
              Yearly <span className="save-badge">Save 20%</span>
            </span>
          </div>
        </div>
        
        <div className="pricing-grid">
          {pricingPlans.map((plan, index) => (
            <div 
              key={index} 
              className={`pricing-card ${plan.popular ? 'popular' : ''}`}
            >
              {plan.popular && <div className="popular-tag">Most Popular</div>}
              
              <div className="pricing-header">
                <h3>{plan.title}</h3>
                <p className="plan-description">{plan.description}</p>
                <div className="price">
                  <span className="currency">$</span>
                  <span className="amount">{plan.price}</span>
                  <span className="period">/mo</span>
                </div>
              </div>
              
              <div className="pricing-features">
                {plan.features.map((feature, i) => (
                  <div key={i} className="feature-item">
                    {feature.included ? (
                      <span className="check-icon">✓</span>
                    ) : (
                      <span className="x-icon">✕</span>
                    )}
                    <span>{feature.name}</span>
                  </div>
                ))}
              </div>
              
              <div className="pricing-footer">
                <button className="select-plan-btn">Select Plan</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HostingTypes;
