import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Monroe | Vasquez Law Firm',
  description: 'Página en español para monroe',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Monroe"
      description="Esta página necesita ser traducida al español."
    />
  );
}
