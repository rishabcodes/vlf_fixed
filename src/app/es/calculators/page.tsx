import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Calculators | Vasquez Law Firm',
  description: 'Página en español para calculators',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Calculators"
      description="Esta página necesita ser traducida al español."
    />
  );
}
