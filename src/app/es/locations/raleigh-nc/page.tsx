import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Raleigh Nc | Vasquez Law Firm',
  description: 'Página en español para raleigh-nc',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Raleigh Nc"
      description="Esta página necesita ser traducida al español."
    />
  );
}
