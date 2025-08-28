/**
 * Vasquez Law Firm Design System Constants
 * Centralized design tokens and brand constants
 */

// Brand Constants
export const BRAND = {
  name: 'Vasquez Law Firm, PLLC',
  tagline: 'YO PELEO POR TI™',
  trademark: 'YO PELEO™',
  phone: '1-844-YO-PELEO',
  phoneNumeric: '1-844-967-3536',
  email: 'leads@vasquezlawfirm.com',
  founded: 1989,
} as const;

// Color Palette - Official brand colors
export const COLORS = {
  // Primary Brand Colors
  burgundy: {
    50: '#FDF2F4',
    100: '#FCE7EA',
    200: '#FAC5CC',
    300: '#F693A0',
    400: '#EF476F',
    500: '#A53A47',
    600: '#8B2635',
    700: '#6B1F2E', // PRIMARY
    800: '#551825',
    900: '#4D1822',
    950: '#2A0C12',
  },
  gold: {
    50: '#FBF8F3',
    100: '#F8F1E4',
    200: '#F0DFC4',
    300: '#E5C199',
    400: '#D4A574',
    500: '#C9974D', // PRIMARY
    600: '#B08740',
    700: '#906431',
    800: '#79522C',
    900: '#664428',
    950: '#3D2818',
  },
  // Neutral Colors
  neutral: {
    0: '#FFFFFF',
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#E5E5E5',
    300: '#D4D4D4',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0A0A0A',
    1000: '#000000',
  },
} as const;

// Semantic Color Mappings
export const SEMANTIC_COLORS = {
  primary: COLORS.gold[500],
  primaryDark: COLORS.gold[600],
  primaryLight: COLORS.gold[400],
  secondary: COLORS.burgundy[700],
  secondaryDark: COLORS.burgundy[800],
  secondaryLight: COLORS.burgundy[600],
  background: COLORS.neutral[0],
  backgroundAlt: COLORS.neutral[50],
  text: {
    primary: COLORS.neutral[900],
    secondary: COLORS.neutral[600],
    muted: COLORS.neutral[500],
    inverse: COLORS.neutral[0],
  },
  border: {
    light: COLORS.neutral[200],
    DEFAULT: COLORS.neutral[300],
    dark: COLORS.neutral[400],
  },
  success: '#22C55E',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
} as const;

// Typography Scale
export const TYPOGRAPHY = {
  fonts: {
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    serif: 'Georgia, Cambria, "Times New Roman", Times, serif',
    display: '"Playfair Display", Georgia, serif',
  },
  sizes: {
    xs: '0.75rem', // 12px
    sm: '0.875rem', // 14px
    base: '1rem', // 16px
    lg: '1.125rem', // 18px
    xl: '1.25rem', // 20px
    '2xl': '1.5rem', // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem', // 48px
    '6xl': '3.75rem', // 60px
    '7xl': '4.5rem', // 72px
  },
  weights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  lineHeights: {
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
} as const;

// Spacing Scale
export const SPACING = {
  0: '0',
  1: '0.25rem', // 4px
  2: '0.5rem', // 8px
  3: '0.75rem', // 12px
  4: '1rem', // 16px
  5: '1.25rem', // 20px
  6: '1.5rem', // 24px
  8: '2rem', // 32px
  10: '2.5rem', // 40px
  12: '3rem', // 48px
  16: '4rem', // 64px
  20: '5rem', // 80px
  24: '6rem', // 96px
} as const;

// Border Radius
export const RADIUS = {
  none: '0',
  sm: '0.125rem', // 2px
  DEFAULT: '0.25rem', // 4px
  md: '0.375rem', // 6px
  lg: '0.5rem', // 8px
  xl: '0.75rem', // 12px
  '2xl': '1rem', // 16px
  full: '9999px',
} as const;

// Shadows
export const SHADOWS = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
} as const;

// Breakpoints
export const BREAKPOINTS = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// Z-Index Scale
export const Z_INDEX = {
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
} as const;
