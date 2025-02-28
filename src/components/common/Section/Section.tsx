import React from 'react';
import { classNames } from '../../../utils';
import { ChildrenProps } from '../../../types';
import Container from '../Container';
import './Section.css';

export interface SectionProps extends ChildrenProps {
  id?: string;
  background?: 'light' | 'dark' | 'gradient' | 'none';
  spacing?: 'sm' | 'md' | 'lg' | 'xl' | 'none';
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

/**
 * Section component for consistent section layout
 */
const Section: React.FC<SectionProps> = ({
  children,
  className,
  id,
  background = 'light',
  spacing = 'lg',
  containerSize = 'lg',
  ...rest
}) => {
  return (
    <section
      id={id}
      className={classNames(
        'section',
        `section-bg-${background}`,
        `section-spacing-${spacing}`,
        className
      )}
      {...rest}
    >
      <Container size={containerSize}>
        {children}
      </Container>
    </section>
  );
};

export default Section;
