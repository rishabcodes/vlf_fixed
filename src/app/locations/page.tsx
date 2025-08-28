import LocationsPageClient from './LocationsPageClient';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Office Locations - Vasquez Law Firm | NC & FL Legal Services',
  description:
    'Visit our 4 convenient office locations across North Carolina and Florida. Smithfield, Raleigh, Charlotte, and Orlando offices with bilingual staff ready to serve you.',
  keywords:
    'Vasquez Law Firm locations, NC law offices, FL law offices, immigration lawyer offices, personal injury attorney locations, bilingual law firm',
  openGraph: {
    title: 'Office Locations - Vasquez Law Firm | NC & FL Legal Services',
    description:
      '4 convenient locations in NC & FL. Free parking, wheelchair accessible, bilingual staff. Schedule your consultation today.',
    images: [{ url: '/images/locations-hero.jpg' }],
  },
};

export default function LocationsPage() {
  return <LocationsPageClient language="en" />;
}
