// Vasquez Law Firm Design System Tokens
// This file defines all design tokens for consistent styling across the application

// ============================================
// COLOR TOKENS
// ============================================

// Brand Colors - Primary Palette
export const colors = {
  // Primary Brand Colors (from logo)
  brand: {
    burgundy: {
      50: '#FDF2F4',
      100: '#FCE7EA',
      200: '#FAC5CC',
      300: '#F693A0',
      400: '#EF476F',
      500: '#A53A47',
      600: '#8B2635',
      700: '#6B1F2E', // PRIMARY - logo shield
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
      500: '#C9974D', // PRIMARY - logo text/crown
      600: '#B08740',
      700: '#906431',
      800: '#79522C',
      900: '#664428',
      950: '#3D2818',
    },
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

  // Semantic Colors
  semantic: {
    success: {
      light: '#86EFAC',
      DEFAULT: '#22C55E',
      dark: '#16A34A',
    },
    warning: {
      light: '#FDE68A',
      DEFAULT: '#F59E0B',
      dark: '#D97706',
    },
    error: {
      light: '#FCA5A5',
      DEFAULT: '#EF4444',
      dark: '#DC2626',
    },
    info: {
      light: '#93C5FD',
      DEFAULT: '#3B82F6',
      dark: '#2563EB',
    },
  },

  // Functional Colors
  functional: {
    background: {
      primary: '#FFFFFF',
      secondary: '#FAFAFA',
      tertiary: '#F5F5F5',
      accent: '#FBF8F3', // Slight gold tint
      dark: '#171717',
    },
    text: {
      primary: '#171717',
      secondary: '#525252',
      tertiary: '#737373',
      inverse: '#FFFFFF',
      accent: '#C9974D', // Gold for highlights
      muted: '#A3A3A3',
    },
    border: {
      light: '#E5E5E5',
      DEFAULT: '#D4D4D4',
      dark: '#737373',
      accent: '#C9974D',
    },
    overlay: {
      light: 'rgba(0, 0, 0, 0.1)',
      medium: 'rgba(0, 0, 0, 0.5)',
      dark: 'rgba(0, 0, 0, 0.8)',
    },
  },
} as const;

// ============================================
// SPACING TOKENS
// ============================================

export const spacing = {
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
  32: '8rem', // 128px
  40: '10rem', // 160px
  48: '12rem', // 192px
  56: '14rem', // 224px
  64: '16rem', // 256px
} as const;

// ============================================
// TYPOGRAPHY TOKENS
// ============================================

export const typography = {
  fonts: {
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    serif: 'Georgia, Cambria, "Times New Roman", Times, serif',
    display: '"Playfair Display", Georgia, serif',
    mono: 'Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
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
    '8xl': '6rem', // 96px
    '9xl': '8rem', // 128px
  },
  weights: {
    thin: 100,
    extralight: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  lineHeights: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
} as const;

// ============================================
// SHADOWS
// ============================================

export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  // Custom brand shadows
  burgundy: '0 4px 14px 0 rgba(107, 31, 46, 0.15)',
  gold: '0 4px 14px 0 rgba(201, 151, 77, 0.15)',
  glow: {
    gold: '0 0 20px rgba(201, 151, 77, 0.3)',
    burgundy: '0 0 20px rgba(107, 31, 46, 0.3)',
  },
} as const;

// ============================================
// BORDER RADIUS
// ============================================

export const borderRadius = {
  none: '0',
  sm: '0.125rem', // 2px
  DEFAULT: '0.25rem', // 4px
  md: '0.375rem', // 6px
  lg: '0.5rem', // 8px
  xl: '0.75rem', // 12px
  '2xl': '1rem', // 16px
  '3xl': '1.5rem', // 24px
  full: '9999px',
} as const;

// ============================================
// TRANSITIONS
// ============================================

export const transitions = {
  duration: {
    fast: '150ms',
    DEFAULT: '300ms',
    slow: '500ms',
    slower: '700ms',
  },
  timing: {
    DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
} as const;

// ============================================
// ANIMATIONS
// ============================================

export const animations = {
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  slideUp: {
    from: { transform: 'translateY(10px)', opacity: 0 },
    to: { transform: 'translateY(0)', opacity: 1 },
  },
  slideDown: {
    from: { transform: 'translateY(-10px)', opacity: 0 },
    to: { transform: 'translateY(0)', opacity: 1 },
  },
  slideLeft: {
    from: { transform: 'translateX(10px)', opacity: 0 },
    to: { transform: 'translateX(0)', opacity: 1 },
  },
  slideRight: {
    from: { transform: 'translateX(-10px)', opacity: 0 },
    to: { transform: 'translateX(0)', opacity: 1 },
  },
  scale: {
    from: { transform: 'scale(0.95)', opacity: 0 },
    to: { transform: 'scale(1)', opacity: 1 },
  },
  rotate: {
    from: { transform: 'rotate(-180deg)' },
    to: { transform: 'rotate(0deg)' },
  },
} as const;

// ============================================
// Z-INDEX SCALE
// ============================================

export const zIndex = {
  0: 0,
  10: 10,
  20: 20,
  30: 30,
  40: 40,
  50: 50,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
} as const;

// ============================================
// BREAKPOINTS
// ============================================

export const breakpoints = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// ============================================
// CSS VARIABLES GENERATOR
// ============================================

export const generateCSSVariables = () => {
  const cssVars: Record<string, string> = {};

  // Color variables
  Object.entries(colors.brand).forEach(([colorName, shades]) => {
    Object.entries(shades).forEach(([shade, value]) => {
      cssVars[`--color-${colorName}-${shade}`] = value;
    });
  });

  Object.entries(colors.neutral).forEach(([shade, value]) => {
    cssVars[`--color-neutral-${shade}`] = value;
  });

  Object.entries(colors.semantic).forEach(([type, values]) => {
    if (typeof values === 'object') {
      Object.entries(values).forEach(([variant, value]) => {
        const key = variant === 'DEFAULT' ? type : `${type}-${variant}`;
        cssVars[`--color-${key}`] = value;
      });
    }
  });

  // Spacing variables
  Object.entries(spacing).forEach(([key, value]) => {
    cssVars[`--spacing-${key}`] = value;
  });

  // Typography variables
  Object.entries(typography.sizes).forEach(([key, value]) => {
    cssVars[`--font-size-${key}`] = value;
  });

  // Shadow variables
  Object.entries(shadows).forEach(([key, value]) => {
    if (typeof value === 'string') {
      cssVars[`--shadow-${key}`] = value;
    }
  });

  // Border radius variables
  Object.entries(borderRadius).forEach(([key, value]) => {
    cssVars[`--radius-${key}`] = value;
  });

  return cssVars;
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Convert hex to RGB
export const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1] || '0', 16),
        g: parseInt(result[2] || '0', 16),
        b: parseInt(result[3] || '0', 16),
      }
    : { r: 0, g: 0, b: 0 };
};

// Convert hex to HSL (for Tailwind CSS variables)
export const hexToHsl = (hex: string): string => {
  const { r, g, b } = hexToRgb(hex);
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rNorm:
        h = ((gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0)) / 6;
        break;
      case gNorm:
        h = ((bNorm - rNorm) / d + 2) / 6;
        break;
      case bNorm:
        h = ((rNorm - gNorm) / d + 4) / 6;
        break;
    }
  }

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
};

// ============================================
// EXPORTED TOKEN COLLECTIONS
// ============================================

export const tokens = {
  colors,
  spacing,
  typography,
  shadows,
  borderRadius,
  transitions,
  animations,
  zIndex,
  breakpoints,
} as const;

export default tokens;
