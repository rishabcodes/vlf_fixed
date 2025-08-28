import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Brunswick | Vasquez Law Firm',
  description: 'Página en español para brunswick',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Brunswick"
      description="Esta página necesita ser traducida al español."
    />
  );
}
