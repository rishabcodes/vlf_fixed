// Vasquez Law Firm Brand Colors
export const colors = {
  // Primary Colors from Logo
  burgundy: '#6B1F2E', // Deep burgundy from shield
  burgundyLight: '#8B2635', // Lighter burgundy for hover states
  burgundyDark: '#5A1925', // Darker burgundy

  gold: '#C9974D', // Rich gold from logo
  goldLight: '#D4A574', // Lighter gold variant
  goldDark: '#B5863C', // Darker gold

  // Supporting Colors
  white: '#FFFFFF',
  black: '#000000',

  // Grays
  gray: {
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
  },

  // Semantic Colors
  success: '#22C55E',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
} as const;

// Color Usage Guidelines
export const colorUsage = {
  primary: colors.burgundy, // Main brand color
  primaryHover: colors.burgundyLight,
  secondary: colors.gold, // Accent color
  secondaryHover: colors.goldLight,
  background: colors.white, // Main background
  text: colors.gray[900], // Primary text
  textLight: colors.gray[600], // Secondary text
  border: colors.gray[200], // Borders
  hover: colors.goldLight, // Hover states
} as const;

// CSS Variable Values (HSL format for Tailwind)
export const cssVars = {
  primary: '349 56% 27%', // #6B1F2E in HSL
  primaryForeground: '0 0% 100%', // white
  ring: '36 35% 53%', // #C9974D in HSL
};

// Tailwind Class Names for Consistency
export const colorClasses = {
  // Backgrounds
  bgPrimary: 'bg-[#6B1F2E]',
  bgPrimaryHover: 'hover:bg-[#8B2635]',
  bgAccent: 'bg-[#C9974D]',
  bgAccentHover: 'hover:bg-[#D4A574]',

  // Text
  textPrimary: 'text-[#6B1F2E]',
  textAccent: 'text-[#C9974D]',
  textAccentHover: 'hover:text-[#D4A574]',

  // Borders
  borderAccent: 'border-[#C9974D]',
  borderPrimary: 'border-[#6B1F2E]',

  // Gradients
  gradientPrimary: 'bg-gradient-to-r from-[#6B1F2E] to-[#8B2635]',
  gradientAccent: 'bg-gradient-to-r from-[#C9974D] to-[#D4A574]',
};
