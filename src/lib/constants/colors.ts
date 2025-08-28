// Design System Colors
export const colors = {
  // Primary colors
  primary: {
    DEFAULT: '#C9974D', // Gold
    50: '#FAF6F0',
    100: '#F5EDE1',
    200: '#EBDAC3',
    300: '#E0C7A5',
    400: '#D5AF6F',
    500: '#C9974D',
    600: '#B17F2B',
    700: '#896020',
    800: '#614115',
    900: '#38250A',
  },

  // Secondary colors
  secondary: {
    DEFAULT: '#6B1F2E', // Burgundy
    50: '#F9F2F3',
    100: '#F3E5E7',
    200: '#E7CBCF',
    300: '#DBB1B7',
    400: '#CF979F',
    500: '#C37D87',
    600: '#A94B58',
    700: '#6B1F2E',
    800: '#4A1520',
    900: '#290B11',
  },

  // Neutral colors
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0a0a0a',
  },

  // Semantic colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',

  // Background colors
  background: {
    primary: '#000000',
    secondary: '#0a0a0a',
    tertiary: '#171717',
  },

  // Text colors
  text: {
    primary: '#FFFFFF',
    secondary: '#D4D4D4',
    tertiary: '#A3A3A3',
    inverse: '#000000',
  },
} as const;

export type Colors = typeof colors;
