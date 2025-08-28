/**
 * Vasquez Law Firm Design System
 *
 * This is the main export file for all design system components,
 * templates, and constants. Import everything from here to ensure
 * consistency across the application.
 */

// Constants and Tokens
export * from './constants';

// Layout Templates
export { MasterLayout } from './templates/MasterLayout';
export { PageTemplate } from './templates/PageTemplate';
export { HeroTemplate } from './templates/HeroTemplate';

// Core Components
export { ConsistentHeader } from './components/ConsistentHeader';
export { ConsistentFooter } from './components/ConsistentFooter';
export { Button } from './components/Button';
export { Card, CardHeader, CardTitle, CardContent, CardFooter } from './components/Card';
export { Section, Container, SectionHeader } from './components/Section';
export { Heading, Text, Tagline } from './components/Typography';
export { PracticeAreaCard } from './components/PracticeAreaCard';

// Color Utilities
export const getColorValue = (path: string): string | undefined => {
  const parts = path.split('.');
  let value: Record<string, unknown> = require('./constants').COLORS as Record<string, unknown>;

  for (const part of parts) {
    if (typeof value === 'object' && value !== null && part in value) {
      value = value[part] as Record<string, unknown>;
    } else {
      return undefined;
    }
  }

  return typeof value === 'string' ? value : undefined;
};

// Responsive Utilities
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

export const mediaQuery = {
  sm: `@media (min-width: ${breakpoints.sm})`,
  md: `@media (min-width: ${breakpoints.md})`,
  lg: `@media (min-width: ${breakpoints.lg})`,
  xl: `@media (min-width: ${breakpoints.xl})`,
  '2xl': `@media (min-width: ${breakpoints['2xl']})`,
};
