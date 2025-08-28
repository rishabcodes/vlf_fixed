import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Catawba | Vasquez Law Firm',
  description: 'Página en español para catawba',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Catawba"
      description="Esta página necesita ser traducida al español."
    />
  );
}
