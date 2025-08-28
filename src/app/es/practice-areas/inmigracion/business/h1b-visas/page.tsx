import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'H1b Visas | Vasquez Law Firm',
  description: 'Página en español para h1b-visas',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="H1b Visas"
      description="Esta página necesita ser traducida al español."
    />
  );
}
