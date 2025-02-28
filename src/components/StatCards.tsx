import { useEffect, useRef } from 'react';
import '../styles/StatCards.css';

interface StatCardProps {
  value: string;
  label: string;
  index: number;
}

const StatCard: React.FC<StatCardProps> = ({ value, label, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    
    // Add animation delay based on index
    card.style.animationDelay = `${index * 0.2}s`;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!card) return;
      
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
      card.style.boxShadow = `
        0 15px 35px rgba(0, 0, 0, 0.1),
        ${rotateY / 3}px ${rotateX / 3}px 30px rgba(0, 0, 0, 0.1)
      `;
      
      // Update the shine position
      const shine = card.querySelector('.card-shine') as HTMLDivElement;
      if (shine) {
        shine.style.background = `radial-gradient(
          circle at ${x}px ${y}px,
          rgba(255, 255, 255, 0.3) 0%,
          rgba(255, 255, 255, 0) 80%
        )`;
      }
    };
    
    const handleMouseLeave = () => {
      if (!card) return;
      
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
      
      const shine = card.querySelector('.card-shine') as HTMLDivElement;
      if (shine) {
        shine.style.background = 'none';
      }
    };
    
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [index]);
  
  return (
    <div className="stat-card-wrapper">
      <div className="stat-card" ref={cardRef}>
        <div className="card-shine"></div>
        <div className="card-content">
          <h3>{value}</h3>
          <p>{label}</p>
        </div>
        <div className="card-glow"></div>
      </div>
    </div>
  );
};

interface StatCardsProps {
  stats: Array<{
    value: string;
    label: string;
  }>;
}

const StatCards: React.FC<StatCardsProps> = ({ stats }) => {
  return (
    <div className="stat-cards-container">
      {stats.map((stat, index) => (
        <StatCard 
          key={index}
          value={stat.value}
          label={stat.label}
          index={index}
        />
      ))}
    </div>
  );
};

export default StatCards;
