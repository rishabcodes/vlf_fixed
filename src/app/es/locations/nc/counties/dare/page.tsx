import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dare | Vasquez Law Firm',
  description: 'Página en español para dare',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Dare"
      description="Esta página necesita ser traducida al español."
    />
  );
}
