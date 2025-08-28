import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Attorney Personal Injury | Vasquez Law Firm',
  description: 'Página en español para abogado-lesiones-personales',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Attorney Personal Injury"
      description="Esta página necesita ser traducida al español."
    />
  );
}
