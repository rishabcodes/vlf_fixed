import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vance | Vasquez Law Firm',
  description: 'Página en español para vance',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Vance"
      description="Esta página necesita ser traducida al español."
    />
  );
}
