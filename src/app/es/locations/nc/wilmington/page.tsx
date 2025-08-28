import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wilmington | Vasquez Law Firm',
  description: 'Página en español para wilmington',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Wilmington"
      description="Esta página necesita ser traducida al español."
    />
  );
}
