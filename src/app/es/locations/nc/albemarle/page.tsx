import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Albemarle | Vasquez Law Firm',
  description: 'Página en español para albemarle',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Albemarle"
      description="Esta página necesita ser traducida al español."
    />
  );
}
