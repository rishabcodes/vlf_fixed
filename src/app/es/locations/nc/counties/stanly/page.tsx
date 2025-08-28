import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Stanly | Vasquez Law Firm',
  description: 'Página en español para stanly',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Stanly"
      description="Esta página necesita ser traducida al español."
    />
  );
}
