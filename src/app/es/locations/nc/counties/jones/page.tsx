import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Jones | Vasquez Law Firm',
  description: 'Página en español para jones',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Jones"
      description="Esta página necesita ser traducida al español."
    />
  );
}
