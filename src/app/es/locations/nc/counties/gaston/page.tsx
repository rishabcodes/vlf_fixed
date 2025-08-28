import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gaston | Vasquez Law Firm',
  description: 'Página en español para gaston',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Gaston"
      description="Esta página necesita ser traducida al español."
    />
  );
}
