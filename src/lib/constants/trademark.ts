// Trademark Constants
// These are official trademarks of Vasquez Law Firm
// Always use these constants instead of hardcoding

export const TRADEMARK = {
  YO_PELEO: 'YO PELEO™',
  YO_PELEO_POR_TI: 'YO PELEO POR TI™',
  I_FIGHT_FOR_YOU: 'I FIGHT FOR YOU™',
  YO_PELEO_NUMBER: '1-844-YO-PELEO',
} as const;

// Export type for TypeScript
export type Trademark = typeof TRADEMARK;
