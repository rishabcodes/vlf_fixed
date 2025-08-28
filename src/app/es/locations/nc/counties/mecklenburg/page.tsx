import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mecklenburg | Vasquez Law Firm',
  description: 'Página en español para mecklenburg',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Mecklenburg"
      description="Esta página necesita ser traducida al español."
    />
  );
}
