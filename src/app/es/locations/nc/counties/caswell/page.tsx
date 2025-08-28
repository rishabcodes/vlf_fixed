import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Caswell | Vasquez Law Firm',
  description: 'Página en español para caswell',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Caswell"
      description="Esta página necesita ser traducida al español."
    />
  );
}
