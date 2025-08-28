import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gates | Vasquez Law Firm',
  description: 'Página en español para gates',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Gates"
      description="Esta página necesita ser traducida al español."
    />
  );
}
