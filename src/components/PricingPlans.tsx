import { useState } from 'react';
import '../styles/PricingPlans.css';

type PlanFeature = {
  name: string;
  included: boolean;
};

type Plan = {
  id: string;
  name: string;
  price: {
    monthly: number;
    yearly: number;
  };
  description: string;
  features: PlanFeature[];
  popular?: boolean;
};

const plans: Plan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: {
      monthly: 4.99,
      yearly: 49.99
    },
    description: 'Perfect for small personal websites and blogs',
    features: [
      { name: '1 Website', included: true },
      { name: '10GB SSD Storage', included: true },
      { name: 'Unmetered Bandwidth', included: true },
      { name: 'Free SSL Certificate', included: true },
      { name: '1 Email Account', included: true },
      { name: '24/7 Support', included: true },
      { name: 'Daily Backups', included: false },
      { name: 'CDN Integration', included: false },
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    price: {
      monthly: 9.99,
      yearly: 99.99
    },
    description: 'Great for businesses and professional websites',
    popular: true,
    features: [
      { name: 'Unlimited Websites', included: true },
      { name: '100GB SSD Storage', included: true },
      { name: 'Unmetered Bandwidth', included: true },
      { name: 'Free SSL Certificate', included: true },
      { name: 'Unlimited Email Accounts', included: true },
      { name: 'Free Domain for 1 Year', included: true },
      { name: 'Priority Support', included: true },
      { name: 'Daily Backups', included: false },
    ]
  },
  {
    id: 'business',
    name: 'Business',
    price: {
      monthly: 14.99,
      yearly: 149.99
    },
    description: 'Advanced features for high-traffic websites',
    features: [
      { name: 'Unlimited Websites', included: true },
      { name: '200GB SSD Storage', included: true },
      { name: 'Unmetered Bandwidth', included: true },
      { name: 'Free SSL Certificate', included: true },
      { name: 'Unlimited Email Accounts', included: true },
      { name: 'Free Domain for 1 Year', included: true },
      { name: 'Priority Support', included: true },
      { name: 'Daily Backups', included: true },
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: {
      monthly: 24.99,
      yearly: 249.99
    },
    description: 'Maximum performance for high-demand applications',
    features: [
      { name: 'Unlimited Websites', included: true },
      { name: '500GB SSD Storage', included: true },
      { name: 'Unmetered Bandwidth', included: true },
      { name: 'Free SSL Certificate', included: true },
      { name: 'Unlimited Email Accounts', included: true },
      { name: 'Free Domain for 1 Year', included: true },
      { name: 'Priority Support', included: true },
      { name: 'Daily Backups', included: true },
    ]
  }
];

const PricingPlans = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <div className="pricing-plans-container">
      <div className="pricing-plans-content">
        <h2>Choose Your Hosting Plan</h2>
        <p>Select the perfect hosting solution for your needs</p>
        
        <div className="billing-toggle">
          <span className={billingCycle === 'monthly' ? 'active' : ''}>Monthly</span>
          <label className="switch">
            <input 
              type="checkbox" 
              checked={billingCycle === 'yearly'} 
              onChange={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
            />
            <span className="slider round"></span>
          </label>
          <span className={billingCycle === 'yearly' ? 'active' : ''}>Yearly <span className="save-badge">Save 20%</span></span>
        </div>
        
        <div className="pricing-cards">
          {plans.map((plan) => (
            <div key={plan.id} className={`pricing-card ${plan.popular ? 'popular' : ''}`}>
              {plan.popular && <div className="popular-badge">Most Popular</div>}
              <div className="plan-header">
                <h3>{plan.name}</h3>
                <p>{plan.description}</p>
              </div>
              <div className="plan-price">
                <span className="currency">$</span>
                <span className="amount">{billingCycle === 'monthly' ? plan.price.monthly : (plan.price.yearly / 12).toFixed(2)}</span>
                <span className="period">/ mo</span>
              </div>
              {billingCycle === 'yearly' && (
                <div className="yearly-price">
                  ${plan.price.yearly} billed annually
                </div>
              )}
              <ul className="plan-features">
                {plan.features.map((feature, index) => (
                  <li key={index} className={feature.included ? 'included' : 'excluded'}>
                    <span className="feature-icon">{feature.included ? '✓' : '×'}</span>
                    {feature.name}
                  </li>
                ))}
              </ul>
              <button className="select-plan-btn">Select Plan</button>
            </div>
          ))}
        </div>
        
        <div className="pricing-guarantee">
          <div className="guarantee-icon">🛡️</div>
          <div className="guarantee-text">
            <h4>30-Day Money-Back Guarantee</h4>
            <p>Try any plan risk-free for 30 days. If you're not completely satisfied, get a full refund.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;
