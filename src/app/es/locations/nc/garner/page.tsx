import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Garner | Vasquez Law Firm',
  description: 'Página en español para garner',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Garner"
      description="Esta página necesita ser traducida al español."
    />
  );
}
