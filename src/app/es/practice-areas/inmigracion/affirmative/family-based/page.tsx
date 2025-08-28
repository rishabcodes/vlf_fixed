import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Family Based | Vasquez Law Firm',
  description: 'Página en español para family-based',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Family Based"
      description="Esta página necesita ser traducida al español."
    />
  );
}
