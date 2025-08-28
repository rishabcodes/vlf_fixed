import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Martin | Vasquez Law Firm',
  description: 'Página en español para martin',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Martin"
      description="Esta página necesita ser traducida al español."
    />
  );
}
