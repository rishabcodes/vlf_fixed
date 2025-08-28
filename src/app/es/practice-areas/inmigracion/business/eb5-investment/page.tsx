import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Eb5 Investment | Vasquez Law Firm',
  description: 'Página en español para eb5-investment',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Eb5 Investment"
      description="Esta página necesita ser traducida al español."
    />
  );
}
