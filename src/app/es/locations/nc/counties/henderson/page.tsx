import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Henderson | Vasquez Law Firm',
  description: 'Página en español para henderson',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Henderson"
      description="Esta página necesita ser traducida al español."
    />
  );
}
