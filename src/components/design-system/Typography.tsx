'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface HeadingProps {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export function Heading({ children, level = 1, className, as }: HeadingProps) {
  const Component = (as || `h${level}`) as keyof React.JSX.IntrinsicElements;

  const styles = {
    1: 'text-5xl sm:text-6xl md:text-7xl font-black tracking-tight',
    2: 'text-4xl sm:text-5xl md:text-6xl font-bold',
    3: 'text-3xl sm:text-4xl md:text-5xl font-bold',
    4: 'text-2xl sm:text-3xl font-semibold',
    5: 'text-xl sm:text-2xl font-semibold',
    6: 'text-lg sm:text-xl font-semibold',
  };

  return React.createElement(
    Component,
    {
      className: cn(styles[level], className),
    },
    children
  );
}

interface TextProps {
  children: React.ReactNode;
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'tertiary' | 'inverse';
  className?: string;
  as?: 'p' | 'span' | 'div';
}

export function Text({
  children,
  size = 'base',
  color = 'secondary',
  className,
  as: elementType = 'p',
}: TextProps) {
  const Component = elementType as keyof React.JSX.IntrinsicElements;

  const sizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  };

  const colors = {
    primary: 'text-white',
    secondary: 'text-gray-300',
    tertiary: 'text-gray-400',
    inverse: 'text-black',
  };

  return React.createElement(
    Component,
    {
      className: cn(sizes[size], colors[color], className),
    },
    children
  );
}

interface TaglineProps {
  children: React.ReactNode;
  className?: string;
}

export function Tagline({ children, className }: TaglineProps) {
  return (
    <p className={cn('text-xl sm:text-2xl font-semibold text-primary', className)}>{children}</p>
  );
}
