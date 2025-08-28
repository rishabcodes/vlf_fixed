import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Selma | Vasquez Law Firm',
  description: 'Página en español para selma',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Selma"
      description="Esta página necesita ser traducida al español."
    />
  );
}
