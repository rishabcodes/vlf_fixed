import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Anson | Vasquez Law Firm',
  description: 'Página en español para anson',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Anson"
      description="Esta página necesita ser traducida al español."
    />
  );
}
