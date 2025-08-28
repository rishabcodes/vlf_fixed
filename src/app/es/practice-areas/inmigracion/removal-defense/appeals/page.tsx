import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Appeals | Vasquez Law Firm',
  description: 'Página en español para appeals',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Appeals"
      description="Esta página necesita ser traducida al español."
    />
  );
}
