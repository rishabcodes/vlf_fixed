import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Caldwell | Vasquez Law Firm',
  description: 'Página en español para caldwell',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Caldwell"
      description="Esta página necesita ser traducida al español."
    />
  );
}
