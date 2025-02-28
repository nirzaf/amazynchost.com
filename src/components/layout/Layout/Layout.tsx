import React from 'react';
import { classNames } from '../../../utils';
import { ChildrenProps } from '../../../types';
import Header, { HeaderProps } from '../Header';
import Footer, { FooterProps } from '../Footer';
import './Layout.css';

export interface LayoutProps extends ChildrenProps {
  headerProps: HeaderProps;
  footerProps: FooterProps;
  showBackToTop?: boolean;
}

/**
 * Layout component that wraps the entire application
 */
const Layout: React.FC<LayoutProps> = ({
  children,
  className,
  headerProps,
  footerProps,
  showBackToTop = true,
  ...rest
}) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={classNames('layout', className)} {...rest}>
      <Header {...headerProps} />
      
      <main className="main-content" style={{ padding: 0, margin: 0 }}>
        {children}
      </main>
      
      <Footer {...footerProps} />
      
      {showBackToTop && (
        <button 
          className="back-to-top" 
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </button>
      )}
    </div>
  );
};

export default Layout;
