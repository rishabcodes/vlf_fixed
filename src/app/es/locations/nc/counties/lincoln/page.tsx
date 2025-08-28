import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lincoln | Vasquez Law Firm',
  description: 'Página en español para lincoln',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Lincoln"
      description="Esta página necesita ser traducida al español."
    />
  );
}
