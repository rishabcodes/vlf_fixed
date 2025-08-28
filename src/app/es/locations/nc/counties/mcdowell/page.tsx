import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mcdowell | Vasquez Law Firm',
  description: 'Página en español para mcdowell',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Mcdowell"
      description="Esta página necesita ser traducida al español."
    />
  );
}
