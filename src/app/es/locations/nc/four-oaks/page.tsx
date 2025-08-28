import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Four Oaks | Vasquez Law Firm',
  description: 'Página en español para four-oaks',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Four Oaks"
      description="Esta página necesita ser traducida al español."
    />
  );
}
