import React from 'react';
import { classNames, getCurrentYear } from '../../../utils';
import { BaseProps, FooterColumn, SocialLink } from '../../../types';
import { Container } from '../../common';
import './Footer.css';

export interface FooterProps extends BaseProps {
  logo: React.ReactNode;
  columns: FooterColumn[];
  socialLinks: SocialLink[];
  companyName: string;
}

/**
 * Footer component for the application
 */
const Footer: React.FC<FooterProps> = ({
  className,
  logo,
  columns,
  socialLinks,
  companyName,
  ...rest
}) => {
  const currentYear = getCurrentYear();

  return (
    <footer className={classNames('footer', className)} {...rest}>
      <Container>
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              {logo}
            </div>
            <p className="footer-tagline">
              Powerful cloud hosting solutions for your business. Fast, secure, and reliable.
            </p>
            <div className="footer-social">
              {socialLinks.map((link, index) => (
                <a 
                  key={index} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={link.ariaLabel}
                  className="social-link"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
          
          <div className="footer-links">
            {columns.map((column, columnIndex) => (
              <div key={columnIndex} className="footer-column">
                <h3 className="footer-column-title">{column.title}</h3>
                <ul className="footer-column-list">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href={link.url}>{link.text}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">
            &copy; {currentYear} {companyName}. All rights reserved.
          </p>
          <div className="footer-legal">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
