import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Piedmont | Vasquez Law Firm',
  description: 'Página en español para piedmont',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Piedmont"
      description="Esta página necesita ser traducida al español."
    />
  );
}
