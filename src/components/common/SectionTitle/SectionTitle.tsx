import React from 'react';
import { classNames } from '../../../utils';
import { BaseProps } from '../../../types';
import './SectionTitle.css';

export interface SectionTitleProps extends BaseProps {
  title: string;
  subtitle?: string;
  alignment?: 'left' | 'center' | 'right';
  titleAs?: 'h1' | 'h2' | 'h3';
  subtitleAs?: 'h3' | 'h4' | 'p';
}

/**
 * SectionTitle component for consistent section headings
 */
const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  className,
  alignment = 'center',
  titleAs = 'h2',
  subtitleAs = 'p',
  ...rest
}) => {
  const TitleTag = titleAs;
  const SubtitleTag = subtitleAs;

  return (
    <div
      className={classNames(
        'section-title',
        `section-title-${alignment}`,
        className
      )}
      {...rest}
    >
      <TitleTag className="section-title-heading">{title}</TitleTag>
      {subtitle && <SubtitleTag className="section-title-subheading">{subtitle}</SubtitleTag>}
    </div>
  );
};

export default SectionTitle;
