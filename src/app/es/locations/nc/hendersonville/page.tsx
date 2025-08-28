import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hendersonville | Vasquez Law Firm',
  description: 'Página en español para hendersonville',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Hendersonville"
      description="Esta página necesita ser traducida al español."
    />
  );
}
