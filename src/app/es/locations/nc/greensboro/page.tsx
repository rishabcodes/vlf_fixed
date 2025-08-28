import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Greensboro | Vasquez Law Firm',
  description: 'Página en español para greensboro',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Greensboro"
      description="Esta página necesita ser traducida al español."
    />
  );
}
