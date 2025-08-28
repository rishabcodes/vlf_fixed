import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Person | Vasquez Law Firm',
  description: 'Página en español para person',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Person"
      description="Esta página necesita ser traducida al español."
    />
  );
}
