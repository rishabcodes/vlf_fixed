import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Polk | Vasquez Law Firm',
  description: 'Página en español para polk',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Polk"
      description="Esta página necesita ser traducida al español."
    />
  );
}
