import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Daca | Vasquez Law Firm',
  description: 'Página en español para daca',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Daca"
      description="Esta página necesita ser traducida al español."
    />
  );
}
