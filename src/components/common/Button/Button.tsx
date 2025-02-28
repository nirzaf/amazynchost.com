import React from 'react';
import { classNames } from '../../../utils';
import { BaseProps } from '../../../types';
import './Button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends BaseProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

/**
 * Button component with various styles and sizes
 */
const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  type = 'button',
  ...rest
}) => {
  return (
    <button
      type={type}
      className={classNames(
        'btn',
        `btn-${variant}`,
        `btn-${size}`,
        {
          'btn-full-width': fullWidth,
          'btn-loading': isLoading,
          'btn-disabled': disabled || isLoading,
        },
        className
      )}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading && <span className="btn-spinner" />}
      {!isLoading && leftIcon && <span className="btn-icon-left">{leftIcon}</span>}
      <span className="btn-text">{children}</span>
      {!isLoading && rightIcon && <span className="btn-icon-right">{rightIcon}</span>}
    </button>
  );
};

export default Button;
