import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rutherford | Vasquez Law Firm',
  description: 'Página en español para rutherford',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Rutherford"
      description="Esta página necesita ser traducida al español."
    />
  );
}
