import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Graham | Vasquez Law Firm',
  description: 'Página en español para graham',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Graham"
      description="Esta página necesita ser traducida al español."
    />
  );
}
