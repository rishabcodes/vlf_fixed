import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'New Bern | Vasquez Law Firm',
  description: 'Página en español para new-bern',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="New Bern"
      description="Esta página necesita ser traducida al español."
    />
  );
}
