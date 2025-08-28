import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Accessibility | Vasquez Law Firm',
  description: 'Página en español para accessibility',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Accessibility"
      description="Esta página necesita ser traducida al español."
    />
  );
}
