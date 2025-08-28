import type { Config } from 'tailwindcss';
import {
  colors,
  spacing,
  typography,
  shadows,
  borderRadius,
  transitions,
  breakpoints,
} from './src/styles/design-tokens';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/design-system/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        xs: '0.75rem',
        sm: '1rem',
        md: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
        '2xl': '3rem',
      },
      screens: {
        xs: '320px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1400px',
      },
    },
    // Use design tokens for base theme with enhanced responsive breakpoints
    screens: {
      ...breakpoints,
      // Additional fine-grained breakpoints for better control
      'xs-max': { max: '639px' },
      'sm-max': { max: '767px' },
      'md-max': { max: '1023px' },
      'lg-max': { max: '1279px' },
      'xl-max': { max: '1535px' },
      // Portrait and landscape orientations
      'portrait': { raw: '(orientation: portrait)' },
      'landscape': { raw: '(orientation: landscape)' },
      // High DPI screens
      'retina': { raw: '(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)' },
      // Touch and hover capabilities
      'touch': { raw: '(hover: none) and (pointer: coarse)' },
      'no-touch': { raw: '(hover: hover) and (pointer: fine)' },
      // Reduced motion preference
      'reduce-motion': { raw: '(prefers-reduced-motion: reduce)' },
      // Dark mode preference
      'dark-mode': { raw: '(prefers-color-scheme: dark)' },
    },
    spacing: spacing,
    extend: {
      colors: {
        // CSS Variables for dynamic theming
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',

        // Brand colors from design tokens
        burgundy: colors.brand.burgundy,
        gold: colors.brand.gold,

        // Primary and secondary aliases
        primary: {
          DEFAULT: colors.brand.gold[500],
          foreground: colors.neutral[0],
          ...colors.brand.gold,
        },
        primaryDark: colors.brand.gold[600],
        secondary: {
          DEFAULT: colors.brand.burgundy[700],
          foreground: colors.neutral[0],
          ...colors.brand.burgundy,
        },
        secondaryDark: colors.brand.burgundy[800],

        // Semantic colors
        success: colors.semantic.success,
        warning: colors.semantic.warning,
        error: colors.semantic.error,
        info: colors.semantic.info,

        // Neutral colors
        neutral: colors.neutral,
        gray: colors.neutral, // Alias for compatibility

        // UI element colors
        destructive: {
          DEFAULT: colors.semantic.error.DEFAULT,
          foreground: colors.neutral[0],
        },
        muted: {
          DEFAULT: colors.neutral[100],
          foreground: colors.neutral[700],
        },
        accent: {
          DEFAULT: colors.brand.gold[500],
          foreground: colors.neutral[900],
        },
        popover: {
          DEFAULT: colors.neutral[0],
          foreground: colors.neutral[900],
        },
        card: {
          DEFAULT: colors.neutral[0],
          foreground: colors.neutral[900],
        },
      },
      borderRadius: borderRadius,
      fontFamily: {
        sans: typography.fonts.sans.split(',').map(f => f.trim()),
        serif: typography.fonts.serif.split(',').map(f => f.trim()),
        display: typography.fonts.display.split(',').map(f => f.trim()),
        mono: typography.fonts.mono.split(',').map(f => f.trim()),
      },
      fontSize: typography.sizes,
      fontWeight: Object.fromEntries(
        Object.entries(typography.weights).map(([k, v]) => [k, String(v)])
      ),
      lineHeight: Object.fromEntries(
        Object.entries(typography.lineHeights).map(([k, v]) => [k, String(v)])
      ),
      letterSpacing: typography.letterSpacing,
      boxShadow: {
        ...Object.fromEntries(Object.entries(shadows).filter(([_, v]) => typeof v === 'string')),
        'glow-gold': shadows.glow.gold,
        'glow-burgundy': shadows.glow.burgundy,
      },
      transitionDuration: transitions.duration,
      transitionTimingFunction: transitions.timing,
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { transform: 'translateY(10px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          from: { transform: 'translateY(-10px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        slideLeft: {
          from: { transform: 'translateX(10px)', opacity: '0' },
          to: { transform: 'translateX(0)', opacity: '1' },
        },
        slideRight: {
          from: { transform: 'translateX(-10px)', opacity: '0' },
          to: { transform: 'translateX(0)', opacity: '1' },
        },
        scale: {
          from: { transform: 'scale(0.95)', opacity: '0' },
          to: { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'slide-left': 'slideLeft 0.3s ease-out',
        'slide-right': 'slideRight 0.3s ease-out',
        scale: 'scale 0.3s ease-out',
        // Responsive animations
        'mobile-fade': 'fadeIn 0.2s ease-out',
        'tablet-slide': 'slideUp 0.4s ease-out',
        'desktop-scale': 'scale 0.6s ease-out',
      },
      // Enhanced aspect ratios for different screen sizes
      aspectRatio: {
        '4/3': '4 / 3',
        '3/2': '3 / 2',
        '5/4': '5 / 4',
        '9/16': '9 / 16',
        '21/9': '21 / 9',
        'mobile': '4 / 5',
        'tablet': '3 / 2',
        'desktop': '16 / 9',
      },
      // Responsive text sizes with better mobile scaling
      fontSize: {
        ...typography.sizes,
        'xs-mobile': '0.6875rem', // 11px
        'sm-mobile': '0.8125rem', // 13px
        'responsive-xs': 'clamp(0.75rem, 2.5vw, 0.875rem)',
        'responsive-sm': 'clamp(0.875rem, 2.8vw, 1rem)',
        'responsive-base': 'clamp(1rem, 3vw, 1.125rem)',
        'responsive-lg': 'clamp(1.125rem, 3.5vw, 1.25rem)',
        'responsive-xl': 'clamp(1.25rem, 4vw, 1.5rem)',
        'responsive-2xl': 'clamp(1.5rem, 5vw, 2.25rem)',
        'responsive-3xl': 'clamp(1.875rem, 6vw, 3rem)',
        'responsive-4xl': 'clamp(2.25rem, 7vw, 3.75rem)',
      },
      // Responsive spacing with fluid values
      spacing: {
        ...spacing,
        'fluid-xs': 'clamp(0.5rem, 2vw, 1rem)',
        'fluid-sm': 'clamp(1rem, 3vw, 2rem)',
        'fluid-md': 'clamp(1.5rem, 4vw, 3rem)',
        'fluid-lg': 'clamp(2rem, 5vw, 4rem)',
        'fluid-xl': 'clamp(3rem, 6vw, 6rem)',
        'fluid-2xl': 'clamp(4rem, 8vw, 8rem)',
      },
      // Responsive max widths
      maxWidth: {
        'xs': '20rem',
        'sm': '24rem',
        'md': '28rem',
        'lg': '32rem',
        'xl': '36rem',
        '2xl': '42rem',
        '3xl': '48rem',
        '4xl': '56rem',
        '5xl': '64rem',
        '6xl': '72rem',
        '7xl': '80rem',
        'mobile': '100%',
        'tablet': '48rem',
        'desktop': '80rem',
        'container-xs': '20rem',
        'container-sm': '32rem',
        'container-md': '48rem',
        'container-lg': '64rem',
        'container-xl': '80rem',
      },
      // Custom utilities for scrollbar hiding
      '.scrollbar-hide': {
        '-ms-overflow-style': 'none',
        'scrollbar-width': 'none',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), 
    require('@tailwindcss/typography'),
    function({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      });
    },
  ],
};

export default config;
