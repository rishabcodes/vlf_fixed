import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hillsborough | Vasquez Law Firm',
  description: 'Página en español para hillsborough',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Hillsborough"
      description="Esta página necesita ser traducida al español."
    />
  );
}
