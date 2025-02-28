import React from 'react';
import { classNames } from '../../../utils';
import { ChildrenProps } from '../../../types';
import './Container.css';

export interface ContainerProps extends ChildrenProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: boolean;
  centered?: boolean;
}

/**
 * Container component for consistent layout
 */
const Container: React.FC<ContainerProps> = ({
  children,
  className,
  size = 'lg',
  padding = true,
  centered = true,
  ...rest
}) => {
  return (
    <div
      className={classNames(
        'container',
        `container-${size}`,
        {
          'container-padding': padding,
          'container-centered': centered,
        },
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Container;
