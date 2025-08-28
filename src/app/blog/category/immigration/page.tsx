import CategoryPageClient from '../CategoryPageClient';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Immigration Law Blog - Vasquez Law Firm, PLLC',
  description: 'Expert insights on immigration law, visa applications, green cards, deportation defense, and citizenship from experienced immigration attorneys.',
  keywords: 'immigration law, immigration attorney, visa, green card, deportation defense, citizenship, immigration blog',
};

export default function ImmigrationCategoryPage() {
  return <CategoryPageClient category="immigration" language="en" />;
}
