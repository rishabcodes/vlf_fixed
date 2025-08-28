import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Davie | Vasquez Law Firm',
  description: 'Página en español para davie',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Davie"
      description="Esta página necesita ser traducida al español."
    />
  );
}
