import CategoryPageClient from '../CategoryPageClient';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Criminal Defense Blog - Vasquez Law Firm, PLLC',
  description: 'Expert legal insights on criminal defense, DUI/DWI, drug charges, assault cases, and your rights from experienced criminal defense attorneys.',
  keywords: 'criminal defense, DUI lawyer, drug charges, assault defense, criminal attorney, criminal defense blog',
};

export default function CriminalDefenseCategoryPage() {
  return <CategoryPageClient category="criminal-defense" language="en" />;
}
