import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Traffic Violations | Vasquez Law Firm',
  description: 'Página en español para traffic-violations',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Traffic Violations"
      description="Esta página necesita ser traducida al español."
    />
  );
}
