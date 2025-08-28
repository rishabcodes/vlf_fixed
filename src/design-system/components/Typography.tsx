'use client';

import React from 'react';

interface HeadingProps {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: '7xl' | '6xl' | '5xl' | '4xl' | '3xl' | '2xl' | 'xl' | 'lg';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
  color?: 'default' | 'primary' | 'secondary' | 'muted' | 'white';
  className?: string;
  animate?: boolean;
}

export const Heading: React.FC<HeadingProps> = ({
  children,
  as: Component = 'h2',
  size = '3xl',
  weight = 'bold',
  color = 'default',
  className = '',
  animate = false,
}) => {
  const sizeClasses = {
    '7xl': 'text-4xl md:text-5xl lg:text-7xl',
    '6xl': 'text-3xl md:text-4xl lg:text-6xl',
    '5xl': 'text-2xl md:text-3xl lg:text-5xl',
    '4xl': 'text-xl md:text-2xl lg:text-4xl',
    '3xl': 'text-lg md:text-xl lg:text-3xl',
    '2xl': 'text-base md:text-lg lg:text-2xl',
    xl: 'text-base md:text-lg lg:text-xl',
    lg: 'text-sm md:text-base lg:text-lg',
  };

  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    extrabold: 'font-extrabold',
  };

  const colorClasses = {
    default: 'text-neutral-900',
    primary: 'text-primary',
    secondary: 'text-secondary',
    muted: 'text-neutral-600',
    white: 'text-white',
  };

  const classes = `${sizeClasses[size]} ${weightClasses[weight]} ${colorClasses[color]} ${className}`;

  if (animate) {
    return (
      <div className="animate-fadeIn">
        <Component className={classes}>{children}</Component>
      </div>
    );
  }

  return <Component className={classes}>{children}</Component>;
};

interface TextProps {
  children: React.ReactNode;
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'default' | 'primary' | 'secondary' | 'muted' | 'white';
  className?: string;
}

export const Text: React.FC<TextProps> = ({
  children,
  size = 'base',
  weight = 'normal',
  color = 'default',
  className = '',
}) => {
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
  };

  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };

  const colorClasses = {
    default: 'text-neutral-700',
    primary: 'text-primary',
    secondary: 'text-secondary',
    muted: 'text-neutral-500',
    white: 'text-white',
  };

  const classes = `${sizeClasses[size]} ${weightClasses[weight]} ${colorClasses[color]} ${className}`;

  return <p className={classes}>{children}</p>;
};

interface TaglineProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Tagline: React.FC<TaglineProps> = ({ children, size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base md:text-lg',
    lg: 'text-lg md:text-xl lg:text-2xl',
  };

  return (
    <p className={`text-primary font-bold tracking-wider ${sizeClasses[size]} ${className}`}>
      {children}
    </p>
  );
};
