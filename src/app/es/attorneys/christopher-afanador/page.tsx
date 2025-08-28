import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Christopher Afanador | Vasquez Law Firm',
  description: 'Página en español para christopher-afanador',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Christopher Afanador"
      description="Esta página necesita ser traducida al español."
    />
  );
}
