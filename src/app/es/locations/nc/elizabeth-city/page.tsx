import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Elizabeth City | Vasquez Law Firm',
  description: 'Página en español para elizabeth-city',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Elizabeth City"
      description="Esta página necesita ser traducida al español."
    />
  );
}
