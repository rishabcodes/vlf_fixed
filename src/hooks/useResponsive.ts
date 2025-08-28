'use client';

import { useState, useEffect, useCallback } from 'react';

// Screen breakpoints based on design tokens
export const SCREEN_BREAKPOINTS = {
  xs: 320,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export type ScreenSize = keyof typeof SCREEN_BREAKPOINTS;

// Screen categories for easier logic
export const SCREEN_CATEGORIES = {
  mobile: ['xs', 'sm'] as const,
  tablet: ['md', 'lg'] as const,
  desktop: ['xl', '2xl'] as const,
} as const;

interface ScreenInfo {
  width: number;
  height: number;
  size: ScreenSize;
  category: 'mobile' | 'tablet' | 'desktop';
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  orientation: 'portrait' | 'landscape';
  pixelRatio: number;
  isTouch: boolean;
  isHighDPI: boolean;
}

// Determine screen size from width
const getScreenSize = (width: number): ScreenSize => {
  if (width >= SCREEN_BREAKPOINTS['2xl']) return '2xl';
  if (width >= SCREEN_BREAKPOINTS.xl) return 'xl';
  if (width >= SCREEN_BREAKPOINTS.lg) return 'lg';
  if (width >= SCREEN_BREAKPOINTS.md) return 'md';
  if (width >= SCREEN_BREAKPOINTS.sm) return 'sm';
  return 'xs';
};

// Determine category from screen size
const getScreenCategory = (size: ScreenSize): 'mobile' | 'tablet' | 'desktop' => {
  if (SCREEN_CATEGORIES.mobile.includes(size as any)) return 'mobile';
  if (SCREEN_CATEGORIES.tablet.includes(size as any)) return 'tablet';
  return 'desktop';
};

// Check if device supports touch
const isTouchDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    (navigator as any).msMaxTouchPoints > 0
  );
};

// Hook for getting current screen information
export const useScreenInfo = (): ScreenInfo => {
  const [screenInfo, setScreenInfo] = useState<ScreenInfo>(() => {
    if (typeof window === 'undefined') {
      return {
        width: 1024,
        height: 768,
        size: 'lg' as ScreenSize,
        category: 'tablet' as const,
        isMobile: false,
        isTablet: true,
        isDesktop: false,
        orientation: 'landscape' as const,
        pixelRatio: 1,
        isTouch: false,
        isHighDPI: false,
      };
    }

    const width = window.innerWidth;
    const height = window.innerHeight;
    const size = getScreenSize(width);
    const category = getScreenCategory(size);
    const orientation = width > height ? 'landscape' : 'portrait';
    const pixelRatio = window.devicePixelRatio || 1;
    const isTouch = isTouchDevice();
    const isHighDPI = pixelRatio > 1.5;

    return {
      width,
      height,
      size,
      category,
      isMobile: category === 'mobile',
      isTablet: category === 'tablet',
      isDesktop: category === 'desktop',
      orientation,
      pixelRatio,
      isTouch,
      isHighDPI,
    };
  });

  const updateScreenInfo = useCallback(() => {
    if (typeof window === 'undefined') return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const size = getScreenSize(width);
    const category = getScreenCategory(size);
    const orientation = width > height ? 'landscape' : 'portrait';
    const pixelRatio = window.devicePixelRatio || 1;
    const isTouch = isTouchDevice();
    const isHighDPI = pixelRatio > 1.5;

    setScreenInfo({
      width,
      height,
      size,
      category,
      isMobile: category === 'mobile',
      isTablet: category === 'tablet',
      isDesktop: category === 'desktop',
      orientation,
      pixelRatio,
      isTouch,
      isHighDPI,
    });
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Debounced resize handler to improve performance
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateScreenInfo, 150);
    };

    const handleOrientationChange = () => {
      // Small delay to ensure dimensions are updated after orientation change
      setTimeout(updateScreenInfo, 100);
    };

    // Initial call
    updateScreenInfo();

    // Event listeners
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleOrientationChange, { passive: true });

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, [updateScreenInfo]);

  return screenInfo;
};

// Hook for checking specific breakpoint
export const useBreakpoint = (breakpoint: ScreenSize): boolean => {
  const { size } = useScreenInfo();
  const breakpointIndex = Object.keys(SCREEN_BREAKPOINTS).indexOf(breakpoint);
  const currentIndex = Object.keys(SCREEN_BREAKPOINTS).indexOf(size);
  return currentIndex >= breakpointIndex;
};

// Hook for responsive values
export const useResponsiveValue = <T>(values: Partial<Record<ScreenSize, T>>): T | undefined => {
  const { size } = useScreenInfo();
  
  // Try to find exact match first
  if (values[size]) {
    return values[size];
  }

  // Fall back to smaller breakpoints
  const breakpointOrder: ScreenSize[] = ['2xl', 'xl', 'lg', 'md', 'sm', 'xs'];
  const currentIndex = breakpointOrder.indexOf(size);

  for (let i = currentIndex; i < breakpointOrder.length; i++) {
    const bp = breakpointOrder[i];
    if (values[bp]) {
      return values[bp];
    }
  }

  return undefined;
};

// Hook for media queries
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
};

// Pre-defined media queries
export const useCommonMediaQueries = () => {
  const isPrefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const isPrefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const isHighContrast = useMediaQuery('(prefers-contrast: high)');
  const canHover = useMediaQuery('(hover: hover) and (pointer: fine)');

  return {
    isPrefersReducedMotion,
    isPrefersDarkMode,
    isHighContrast,
    canHover,
  };
};

// Utility functions
export const getResponsiveClasses = (
  baseClass: string,
  responsiveClasses: Partial<Record<ScreenSize, string>>
): string => {
  const classes = [baseClass];
  
  Object.entries(responsiveClasses).forEach(([breakpoint, className]) => {
    if (className) {
      classes.push(`${breakpoint}:${className}`);
    }
  });
  
  return classes.join(' ');
};

// Container size utilities
export const getContainerPadding = (screenInfo: ScreenInfo): string => {
  if (screenInfo.isMobile) return 'px-4';
  if (screenInfo.isTablet) return 'px-6';
  return 'px-8';
};

export const getMaxWidth = (screenInfo: ScreenInfo): string => {
  switch (screenInfo.size) {
    case 'xs':
    case 'sm':
      return 'max-w-full';
    case 'md':
      return 'max-w-3xl';
    case 'lg':
      return 'max-w-5xl';
    case 'xl':
      return 'max-w-6xl';
    case '2xl':
      return 'max-w-7xl';
    default:
      return 'max-w-7xl';
    }
};

// Typography scaling
export const getResponsiveFontSize = (
  baseSize: string,
  screenInfo: ScreenInfo
): string => {
  const sizeMap: Record<string, Record<string, string>> = {
    'text-xs': { mobile: 'text-xs', tablet: 'text-xs', desktop: 'text-sm' },
    'text-sm': { mobile: 'text-sm', tablet: 'text-sm', desktop: 'text-base' },
    'text-base': { mobile: 'text-sm', tablet: 'text-base', desktop: 'text-lg' },
    'text-lg': { mobile: 'text-base', tablet: 'text-lg', desktop: 'text-xl' },
    'text-xl': { mobile: 'text-lg', tablet: 'text-xl', desktop: 'text-2xl' },
    'text-2xl': { mobile: 'text-xl', tablet: 'text-2xl', desktop: 'text-3xl' },
    'text-3xl': { mobile: 'text-2xl', tablet: 'text-3xl', desktop: 'text-4xl' },
    'text-4xl': { mobile: 'text-2xl', tablet: 'text-4xl', desktop: 'text-5xl' },
    'text-5xl': { mobile: 'text-3xl', tablet: 'text-5xl', desktop: 'text-6xl' },
  };

  return sizeMap[baseSize]?.[screenInfo.category] || baseSize;
};