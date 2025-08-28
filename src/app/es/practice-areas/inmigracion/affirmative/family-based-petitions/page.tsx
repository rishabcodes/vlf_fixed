import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Family Based Petitions | Vasquez Law Firm',
  description: 'Página en español para family-based-petitions',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Family Based Petitions"
      description="Esta página necesita ser traducida al español."
    />
  );
}
