import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Workers Comp Attorney | Vasquez Law Firm',
  description: 'Página en español para workers-comp-attorney',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Workers Comp Attorney"
      description="Esta página necesita ser traducida al español."
    />
  );
}
