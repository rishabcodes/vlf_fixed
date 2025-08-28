import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Workers Compensation Lawyer | Vasquez Law Firm',
  description: 'Página en español para workers-compensation-lawyer',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Workers Compensation Lawyer"
      description="Esta página necesita ser traducida al español."
    />
  );
}
