import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Mental Health Claims | Vasquez Law Firm',
  description: 'Página en español para mental-health-claims',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Mental Health Claims"
      description="Esta página necesita ser traducida al español."
    />
  );
}
