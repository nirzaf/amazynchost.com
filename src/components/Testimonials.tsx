import { useState } from 'react';
import '../styles/Testimonials.css';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'E-commerce Entrepreneur',
    company: 'FashionBoutique.com',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
    content: 'Switching to AmazyncHost was the best decision for my online store. The page load times are incredibly fast, and their customer support team is always available to help with any issues. My sales have increased by 30% since the switch!',
    rating: 5
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Tech Blogger',
    company: 'TechInsider',
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
    content: 'As someone who writes about technology, I need reliable hosting that can handle traffic spikes when my articles go viral. AmazyncHost has never let me down, even during my busiest periods. The uptime is impressive!',
    rating: 5
  },
  {
    id: 3,
    name: 'Jessica Miller',
    role: 'Digital Marketing Director',
    company: 'GrowthAgency',
    image: 'https://randomuser.me/api/portraits/women/3.jpg',
    content: 'We manage websites for dozens of clients, and AmazyncHost makes it easy with their intuitive control panel. The ability to quickly deploy new sites and manage resources has streamlined our workflow significantly.',
    rating: 4
  },
  {
    id: 4,
    name: 'David Wilson',
    role: 'Small Business Owner',
    company: 'LocalCafe',
    image: 'https://randomuser.me/api/portraits/men/4.jpg',
    content: 'As a small business, we needed affordable hosting without compromising on quality. AmazyncHost offers the perfect balance. Our website is fast, secure, and we haven\'t experienced any downtime in over a year.',
    rating: 5
  },
  {
    id: 5,
    name: 'Emma Thompson',
    role: 'Nonprofit Coordinator',
    company: 'GreenEarth Foundation',
    image: 'https://randomuser.me/api/portraits/women/5.jpg',
    content: 'The customer service at AmazyncHost is exceptional. When we needed to quickly launch a campaign website, their team guided us through the entire process. They truly care about their customers\' success.',
    rating: 5
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };
  
  const goToTestimonial = (index: number) => {
    setActiveIndex(index);
  };
  
  return (
    <div className="testimonials-container">
      <div className="testimonials-content">
        <div className="section-header">
          <h2>What Our Customers Say</h2>
          <p>Don't just take our word for it - hear from some of our satisfied customers</p>
        </div>
        
        <div className="testimonials-carousel">
          <div className="testimonial-card">
            <div className="testimonial-header">
              <div className="testimonial-avatar">
                <img src={testimonials[activeIndex].image} alt={testimonials[activeIndex].name} />
              </div>
              <div className="testimonial-author">
                <h4>{testimonials[activeIndex].name}</h4>
                <p>{testimonials[activeIndex].role}</p>
                <p className="company">{testimonials[activeIndex].company}</p>
              </div>
            </div>
            
            <div className="testimonial-rating">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < testimonials[activeIndex].rating ? 'star filled' : 'star'}>★</span>
              ))}
            </div>
            
            <div className="testimonial-content">
              <p>"{testimonials[activeIndex].content}"</p>
            </div>
            
            <div className="testimonial-controls">
              <button className="control-btn" onClick={prevTestimonial}>
                ←
              </button>
              <div className="testimonial-dots">
                {testimonials.map((_, index) => (
                  <button 
                    key={index} 
                    className={`dot-btn ${index === activeIndex ? 'active' : ''}`}
                    onClick={() => goToTestimonial(index)}
                  />
                ))}
              </div>
              <button className="control-btn" onClick={nextTestimonial}>
                →
              </button>
            </div>
          </div>
        </div>
        
        <div className="testimonials-stats">
          <div className="stat-item">
            <h3>10,000+</h3>
            <p>Happy Customers</p>
          </div>
          <div className="stat-item">
            <h3>4.9/5</h3>
            <p>Average Rating</p>
          </div>
          <div className="stat-item">
            <h3>99.8%</h3>
            <p>Customer Satisfaction</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
