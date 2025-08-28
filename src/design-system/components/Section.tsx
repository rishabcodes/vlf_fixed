'use client';

import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  variant?: 'default' | 'alt' | 'dark' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  id?: string;
}

export const Section: React.FC<SectionProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  id,
}) => {
  const variantClasses = {
    default: 'bg-white',
    alt: 'bg-neutral-50',
    dark: 'bg-secondary text-white',
    gradient: 'bg-gradient-to-b from-neutral-50 to-white',
  };

  const sizeClasses = {
    sm: 'py-8 lg:py-12',
    md: 'py-12 lg:py-16',
    lg: 'py-16 lg:py-24',
    xl: 'py-20 lg:py-32',
  };

  return (
    <section id={id}

                className={`${variantClasses[variant]} ${sizeClasses[size]} ${className}`}>
      {children}
    </section>
  );
};

interface ContainerProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({ children, size = 'lg', className = '' }) => {
  const sizeClasses = {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full',
  };

  return (
    <div className={`${sizeClasses[size]} mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
};

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  centered = true,
  className = '',
}) => {
  return (
    <div
className={`mb-12 ${centered ? 'text-center' : ''} ${className}`}
    >
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">{title}</h2>
      {subtitle && <p className="text-lg text-neutral-600 max-w-3xl mx-auto">{subtitle}</p>}
    </div>
  );
};
