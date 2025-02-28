import React, { useState, useEffect } from 'react';
import { useScrollPosition } from '../../../hooks';
import { classNames } from '../../../utils';
import { BaseProps, NavLink } from '../../../types';
import { Container } from '../../common';
import './Header.css';

export interface HeaderProps extends BaseProps {
  logo: React.ReactNode;
  navLinks: NavLink[];
  onNavLinkClick?: (link: NavLink) => void;
}

/**
 * Header component for the application
 */
const Header: React.FC<HeaderProps> = ({
  className,
  logo,
  navLinks,
  onNavLinkClick,
  ...rest
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScrollPosition();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setIsScrolled(scrollY > 50);
  }, [scrollY]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavLinkClick = (link: NavLink) => {
    setMobileMenuOpen(false);
    if (onNavLinkClick) {
      onNavLinkClick(link);
    }
  };

  return (
    <header
      className={classNames(
        'header',
        {
          'header-scrolled': isScrolled,
          'mobile-menu-open': mobileMenuOpen,
        },
        className
      )}
      {...rest}
    >
      <Container>
        <div className="header-content">
          <div className="logo">
            {logo}
          </div>
          
          <div 
            className={classNames('mobile-menu-toggle', { active: mobileMenuOpen })} 
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            role="button"
            tabIndex={0}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          
          <nav className={classNames('main-nav', { active: mobileMenuOpen })}>
            <ul>
              {navLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.url} 
                    className={classNames({ active: link.isActive || false })}
                    onClick={() => handleNavLinkClick(link)}
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="header-buttons">
            <button className="login-btn">Login</button>
            <button className="signup-btn">Sign Up</button>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
