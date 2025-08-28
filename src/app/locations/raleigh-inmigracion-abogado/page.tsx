import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Raleigh Immigration Lawyer | Vasquez Law Firm',
  description: 'Página en español para raleigh-immigration-lawyer',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Raleigh Immigration Lawyer"
      description="Esta página necesita ser traducida al español."
    />
  );
}
