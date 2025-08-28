import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sampson | Vasquez Law Firm',
  description: 'Página en español para sampson',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Sampson"
      description="Esta página necesita ser traducida al español."
    />
  );
}
