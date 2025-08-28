'use client';

import React from 'react';

import Link from 'next/link';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'bordered' | 'elevated' | 'gradient';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  href?: string;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  hover = false,
  href,
  className = '',
}) => {
  const baseClasses = 'rounded-xl overflow-hidden transition-all duration-300';

  const variantClasses = {
    default: 'bg-white',
    bordered: 'bg-white border border-neutral-200',
    elevated: 'bg-white shadow-lg',
    gradient: 'bg-gradient-to-br from-white to-neutral-50',
  };

  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const hoverClasses = hover ? 'hover:shadow-xl hover:-translate-y-1' : '';

  const classes = `${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${hoverClasses} ${className}`;

  const CardContent = (
    <div className={classes}>
      {children}
    </div>
  );

  if (href) {
    return (
      <Link href={href}

                className="block">
        {CardContent}
      </Link>
    );
  }

  return CardContent;
};

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className = '' }) => (
  <div className={`mb-4 ${className}`}>{children}</div>
);

interface CardTitleProps {
  children: React.ReactNode;
  as?: 'h2' | 'h3' | 'h4';
  className?: string;
}

export const CardTitle: React.FC<CardTitleProps> = ({
  children,
  as: Component = 'h3',
  className = '',
}) => (
  <Component className={`text-xl font-bold text-neutral-900 ${className}`}>{children}</Component>
);

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({ children, className = '' }) => (
  <div className={`text-neutral-600 ${className}`}>{children}</div>
);

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, className = '' }) => (
  <div className={`mt-6 pt-6 border-t border-neutral-200 ${className}`}>{children}</div>
);
