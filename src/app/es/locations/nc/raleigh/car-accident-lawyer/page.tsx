import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Car Accident Lawyer | Vasquez Law Firm',
  description: 'Página en español para car-accident-lawyer',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Car Accident Lawyer"
      description="Esta página necesita ser traducida al español."
    />
  );
}
