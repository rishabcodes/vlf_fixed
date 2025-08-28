// Vasquez Law Firm Official Brand Colors
// Based on official VLF logo (BANNER_TRANS.PNG, LOGO_TRANS.PNG)
export const brandColors = {
  // Primary Colors (from official logo)
  burgundy: {
    900: '#551825', // Darkest - used for dark themes
    800: '#6B1F2E', // PRIMARY - shield background from logo
    700: '#8B2635', // Medium - hover states
    600: '#A53A47', // Light - backgrounds
    DEFAULT: '#6B1F2E', // Primary burgundy
  },
  gold: {
    800: '#B08740', // Dark gold - shadows
    700: '#C9974D', // PRIMARY - text/crown/scales from logo
    600: '#D4A574', // Medium - hover states
    500: '#E5C199', // Light - backgrounds
    DEFAULT: '#C9974D', // Primary gold
  },

  // Gradients
  gradients: {
    burgundy: 'from-[#6B1F2E] to-[#8B2635]',
    burgundyDark: 'from-[#551825] to-[#6B1F2E]',
    gold: 'from-[#C9974D] to-[#D4A574]',
    goldDark: 'from-[#B08740] to-[#C9974D]',
    mixed: 'from-[#6B1F2E] via-[#8B2635] to-[#C9974D]',
  },

  // Utility Colors
  white: '#FFFFFF',
  black: '#000000',
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
};

// Tailwind class utilities
export const colorClasses = {
  // Backgrounds
  bgBurgundy: 'bg-[#6B1F2E]',
  bgBurgundyDark: 'bg-[#551825]',
  bgBurgundyLight: 'bg-[#8B2635]',
  bgGold: 'bg-[#C9974D]',
  bgGoldDark: 'bg-[#B08740]',
  bgGoldLight: 'bg-[#D4A574]',

  // Text
  textBurgundy: 'text-[#6B1F2E]',
  textBurgundyDark: 'text-[#551825]',
  textGold: 'text-[#C9974D]',
  textGoldDark: 'text-[#B08740]',

  // Borders
  borderBurgundy: 'border-[#6B1F2E]',
  borderGold: 'border-[#C9974D]',

  // Hover states
  hoverBurgundy: 'hover:bg-[#8B2635]',
  hoverBurgundyDark: 'hover:bg-[#551825]',
  hoverGold: 'hover:bg-[#D4A574]',
  hoverGoldDark: 'hover:bg-[#B08740]',

  // Gradients
  gradientBurgundy: 'bg-gradient-to-r from-[#6B1F2E] to-[#8B2635]',
  gradientGold: 'bg-gradient-to-r from-[#C9974D] to-[#D4A574]',
  gradientMixed: 'bg-gradient-to-r from-[#6B1F2E] via-[#8B2635] to-[#C9974D]',
};
