import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pamlico | Vasquez Law Firm',
  description: 'Página en español para pamlico',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Pamlico"
      description="Esta página necesita ser traducida al español."
    />
  );
}
