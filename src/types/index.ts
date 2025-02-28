/**
 * Common types used throughout the application
 */

export interface BaseProps {
  className?: string;
}

export interface ChildrenProps extends BaseProps {
  children: React.ReactNode;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  features: string[];
  isPopular?: boolean;
  buttonText: string;
}

export interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  avatar: string;
  rating: number;
  content: string;
}

export interface HostingType {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
}

export interface StatCard {
  value: string;
  label: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
  ariaLabel: string;
}

export interface FooterLink {
  text: string;
  url: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface NavLink {
  text: string;
  url: string;
  isActive?: boolean;
}
