'use client';

import React, { ReactNode } from 'react';
import { useScreenInfo, getContainerPadding, getMaxWidth } from '@/hooks/useResponsive';
import { cn } from '@/lib/utils';

interface ResponsiveWrapperProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  variant?: 'container' | 'full-width' | 'content' | 'section';
  enableMotion?: boolean;
  adaptivePadding?: boolean;
  centerContent?: boolean;
  className?: string;
}

export const ResponsiveWrapper: React.FC<ResponsiveWrapperProps> = ({
  children,
  variant = 'container',
  enableMotion = false,
  adaptivePadding = true,
  centerContent = true,
  className = '',
  ...motionProps
}) => {
  const screenInfo = useScreenInfo();

  // Get responsive classes based on variant
  const getVariantClasses = (): string => {
    switch (variant) {
      case 'container':
        return cn(
          'w-full mx-auto',
          getMaxWidth(screenInfo),
          adaptivePadding ? getContainerPadding(screenInfo) : '',
          centerContent ? 'flex flex-col items-center' : ''
        );
      case 'full-width':
        return cn(
          'w-full',
          adaptivePadding ? getContainerPadding(screenInfo) : '',
          centerContent ? 'flex flex-col items-center' : ''
        );
      case 'content':
        return cn(
          'w-full max-w-4xl mx-auto',
          adaptivePadding ? getContainerPadding(screenInfo) : '',
          centerContent ? 'flex flex-col items-center' : ''
        );
      case 'section':
        return cn(
          'w-full',
          screenInfo.isMobile ? 'py-8' : screenInfo.isTablet ? 'py-12' : 'py-16',
          adaptivePadding ? getContainerPadding(screenInfo) : ''
        );
      default:
        return 'w-full';
        }
};

  const baseClasses = getVariantClasses();
  const combinedClasses = cn(baseClasses, className);

  // Animation variants based on screen size
  const getAnimationVariants = () => {
    const baseDistance = screenInfo.isMobile ? 20 : screenInfo.isTablet ? 30 : 40;
    
    return {
      initial: {
        opacity: 0,
        y: baseDistance,
      },
      animate: {
        opacity: 1,
        y: 0,
      },
      exit: {
        opacity: 0,
        y: -baseDistance,
      },
    };
  };

  // Responsive motion properties
  const getMotionProps = (): HTMLMotionProps<'div'> => {
    const baseProps: HTMLMotionProps<'div'> = {
      className: combinedClasses,
      ...motionProps,
    };

    if (enableMotion && !screenInfo.isMobile) {
      return {
        ...baseProps,
        ...getAnimationVariants(),
        transition: {
          duration: screenInfo.isDesktop ? 0.6 : 0.4,
          ease: 'easeOut',
        },
      };
    }

    return baseProps;
  };

  if (enableMotion) {
    return <div {...getMotionProps()}>{children}</div>;
  }

  return <div className={combinedClasses}>{children}</div>;
};

// Specialized responsive components
export const ResponsiveContainer: React.FC<
  Omit<ResponsiveWrapperProps, 'variant'>
> = (props) => <ResponsiveWrapper variant="container" {...props} />;

export const ResponsiveSection: React.FC<
  Omit<ResponsiveWrapperProps, 'variant'>
> = (props) => <ResponsiveWrapper variant="section" {...props} />;

export const ResponsiveContent: React.FC<
  Omit<ResponsiveWrapperProps, 'variant'>
> = (props) => <ResponsiveWrapper variant="content" {...props} />;

// Grid system for responsive layouts
interface ResponsiveGridProps {
  children: ReactNode;
  columns?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    '2xl'?: number;
  };
  gap?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    '2xl'?: number;
  };
  className?: string;
}

export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  columns = { xs: 1, sm: 2, md: 3, lg: 4 },
  gap = { xs: 4, sm: 6, md: 8 },
  className = '',
}) => {
  const screenInfo = useScreenInfo();

  // Get current columns and gap based on screen size
  const getCurrentColumns = (): number => {
    if (screenInfo.size === '2xl' && columns['2xl']) return columns['2xl'];
    if (screenInfo.size === 'xl' && columns.xl) return columns.xl;
    if (screenInfo.size === 'lg' && columns.lg) return columns.lg;
    if (screenInfo.size === 'md' && columns.md) return columns.md;
    if (screenInfo.size === 'sm' && columns.sm) return columns.sm;
    return columns.xs || 1;
  };

  const getCurrentGap = (): number => {
    if (screenInfo.size === '2xl' && gap['2xl']) return gap['2xl'];
    if (screenInfo.size === 'xl' && gap.xl) return gap.xl;
    if (screenInfo.size === 'lg' && gap.lg) return gap.lg;
    if (screenInfo.size === 'md' && gap.md) return gap.md;
    if (screenInfo.size === 'sm' && gap.sm) return gap.sm;
    return gap.xs || 4;
  };

  const currentColumns = getCurrentColumns();
  const currentGap = getCurrentGap();

  const gridClasses = cn(
    'grid w-full',
    `grid-cols-${currentColumns}`,
    `gap-${currentGap}`,
    className
  );

  return <div className={gridClasses}>{children}</div>;
};

// Responsive text component
interface ResponsiveTextProps {
  children: ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  color?: string;
  className?: string;
}

export const ResponsiveText: React.FC<ResponsiveTextProps> = ({
  children,
  as: Component = 'p',
  size = 'base',
  weight = 'normal',
  color = 'text-gray-900',
  className = '',
}) => {
  const screenInfo = useScreenInfo();

  // Responsive font size mapping
  const getFontSize = (): string => {
    const sizeMap: Record<string, Record<string, string>> = {
      xs: { mobile: 'text-xs', tablet: 'text-xs', desktop: 'text-sm' },
      sm: { mobile: 'text-sm', tablet: 'text-sm', desktop: 'text-base' },
      base: { mobile: 'text-sm', tablet: 'text-base', desktop: 'text-lg' },
      lg: { mobile: 'text-base', tablet: 'text-lg', desktop: 'text-xl' },
      xl: { mobile: 'text-lg', tablet: 'text-xl', desktop: 'text-2xl' },
      '2xl': { mobile: 'text-xl', tablet: 'text-2xl', desktop: 'text-3xl' },
      '3xl': { mobile: 'text-2xl', tablet: 'text-3xl', desktop: 'text-4xl' },
      '4xl': { mobile: 'text-2xl', tablet: 'text-4xl', desktop: 'text-5xl' },
      '5xl': { mobile: 'text-3xl', tablet: 'text-5xl', desktop: 'text-6xl' },
    };

    return sizeMap[size]?.[screenInfo.category] || `text-${size}`;
  };

  const classes = cn(
    getFontSize(),
    `font-${weight}`,
    color,
    className
  );

  return <Component className={classes}>{children}</Component>;
};

// Responsive image component
interface ResponsiveImageProps {
  src: string;
  alt: string;
  aspectRatio?: {
    xs?: string;
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
    '2xl'?: string;
  };
  objectFit?: 'cover' | 'contain' | 'fill' | 'scale-down' | 'none';
  className?: string;
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  aspectRatio = { xs: 'aspect-square', sm: 'aspect-video', md: 'aspect-video' },
  objectFit = 'cover',
  className = '',
}) => {
  const screenInfo = useScreenInfo();

  const getCurrentAspectRatio = (): string => {
    if (screenInfo.size === '2xl' && aspectRatio['2xl']) return aspectRatio['2xl'];
    if (screenInfo.size === 'xl' && aspectRatio.xl) return aspectRatio.xl;
    if (screenInfo.size === 'lg' && aspectRatio.lg) return aspectRatio.lg;
    if (screenInfo.size === 'md' && aspectRatio.md) return aspectRatio.md;
    if (screenInfo.size === 'sm' && aspectRatio.sm) return aspectRatio.sm;
    return aspectRatio.xs || 'aspect-video';
  };

  const classes = cn(
    'w-full rounded-lg overflow-hidden',
    getCurrentAspectRatio(),
    `object-${objectFit}`,
    className
  );

  return <img src={src}

                alt={alt}

                className={classes} />;
};