import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Guilford | Vasquez Law Firm',
  description: 'Página en español para guilford',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Guilford"
      description="Esta página necesita ser traducida al español."
    />
  );
}
