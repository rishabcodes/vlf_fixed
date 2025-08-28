import CategoryPageClient from '../CategoryPageClient';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Personal Injury Blog - Vasquez Law Firm, PLLC',
  description: 'Legal insights on personal injury cases, car accidents, slip and fall, medical malpractice, and injury claims from experienced attorneys.',
  keywords: 'personal injury, car accident lawyer, slip and fall, medical malpractice, injury attorney, personal injury blog',
};

export default function PersonalInjuryCategoryPage() {
  return <CategoryPageClient category="personal-injury" language="en" />;
}
