import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Locations | Vasquez Law Firm',
  description: 'Página en español para locations',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Locations"
      description="Esta página necesita ser traducida al español."
    />
  );
}
